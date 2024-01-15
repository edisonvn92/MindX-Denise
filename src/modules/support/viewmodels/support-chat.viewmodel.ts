import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import getUserMedia from 'get-user-media-promise';
import { useToast } from '@mx/ui';
import { DataConnection } from 'peerjs';
import { useNavigate } from 'react-router-dom';
import { SuportRequestExpireTimeEnum, SupportStatusEnum } from '../helper/SupportStatusEnum';
import { SupportHttpRepository } from '../adapters/repositories';
import { requestMediaPermissions } from '../utils/requestMediaPermissons';
import {
  DialogType,
  MediaPermissionsError,
} from '../components/RemindMicrophone/MediaOnboardingDialog';
import { useAppContext, useBaseViewModel } from '@/core';
import { SupportEntity } from '@/domains/support/entities';
import { FinishSupportUseCase } from '@/domains/support/usecases';
import { Message as PeerMessageData, PeerConnection, ChatMessageData } from '@/helpers/peer';
import { socket } from '@/core/context/SocketContext';
import {
  EventCommand,
  MentorStatusEnum,
  StudentStatusEnum,
} from '@/domains/realtime-dashboard/entities';
import { RecallRequestUseCase } from '@/domains/support/usecases/recall-request.usecase';
import { CancelRecallUseCase } from '@/domains/support/usecases/cancel-recall.repository';

dayjs.extend(duration);

const supportChatViewModel = () => {
  const repo = new SupportHttpRepository();
  const recallRequestUC = new RecallRequestUseCase(repo);
  const finishSupportUC = new FinishSupportUseCase(repo);
  const CancelRecallUC = new CancelRecallUseCase(repo);
  const supportItem = JSON.parse(sessionStorage.getItem('supportItem') || '{}') as SupportEntity;
  const incomingPeerId = supportItem.peerId;
  const { t, currentUser } = useAppContext();
  const { catchAction } = useBaseViewModel();
  const [supportStatus, setSupportStatus] = useState<SupportStatusEnum>(SupportStatusEnum.Waiting);
  const [requestExpiring, setRequestExpiring] = useState<boolean>(false);
  const [chatContentList, setChatContentList] = useState<ChatMessageData[]>([]);
  const [currentPeerId, setCurrentPeerId] = useState<string>('');
  const [liveBlockRoomId, setLiveBlockRoomId] = useState<string>(supportItem.liveBlockId);
  const localStream = useRef<HTMLVideoElement>(null);
  const remoteStream = useRef<HTMLVideoElement>(null);
  const [endSessionTime, setEndSessionTime] = useState<Dayjs>(dayjs().add(15, 'm'));
  const [sessionTimeLeft, setSessionTimeLeft] = useState<number>(900000);
  const [recallSupportId, setRecallSupportId] = useState<string>('');
  const incomingPeer = useRef<string | null>(null);

  let setCountDownInterval: any;

  const isTeacher: boolean = true;
  const [isBlockedMicrophone, setIsBlockedMicrophone] = useState<boolean>(false);
  const [audioAllowed, setAudioAllowed] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<DialogType | null>(null);
  const [errorDetails, setErrorDetails] = useState<MediaPermissionsError | undefined>();

  const defaultRecallRequestValue = {
    mentorUid: currentUser.id,
    peerId: '',
    id: '',
  };

  const requestRecallForm = useForm({
    mode: 'onTouched',
    defaultValues: defaultRecallRequestValue,
    values: defaultRecallRequestValue,
  });

  const chatPrefixList = [t('support:replyAnswer'), t('support:help'), t('support:practiceAgain')];

  const defaultChatFormValue = {
    chatText: '',
    prefix: chatPrefixList[0],
  };

  const chatForm = useForm({
    mode: 'onTouched',
    defaultValues: defaultChatFormValue,
    values: defaultChatFormValue,
  });

  const toast = useToast();

  const navigate = useNavigate();

  const { setValue, getValues } = chatForm;

  const getMediaStream = async () => {
    navigator.permissions.query({ name: 'microphone' as PermissionName }).then(async (result) => {
      if (result.state === 'granted') {
        setAudioAllowed(true);
        setIsBlockedMicrophone(false);
      } else if (audioAllowed) {
        setShowDialog(DialogType.TRACKERROR);
      } else {
        setIsBlockedMicrophone(true);
      }
    });
    if (audioAllowed) {
      setShowDialog(DialogType.TRACKERROR);
      return requestMediaPermissions()
        .then((stream: any) => {
          if (localStream.current) {
            localStream.current.srcObject = stream;
          }
          setAudioAllowed(true);
          setShowDialog(null);
          setIsBlockedMicrophone(false);
          return stream;
        })
        .catch((error: MediaPermissionsError) => {
          setErrorDetails(error);
        });
    }

    return getUserMedia({ video: false, audio: true });
  };

  useEffect(() => {
    if (localStream.current) {
      getMediaStream();
    }
  }, [isBlockedMicrophone, audioAllowed, localStream.current]);

  useEffect(() => {
    if (supportStatus === SupportStatusEnum.Started) {
      socket.emit(
        EventCommand.StudentSupport,
        JSON.stringify({
          uid: currentUser?.id,
          role: 'MENTOR',
        }),
      );
    }
  }, [supportStatus]);

  const actionEnterChat = async () => {
    try {
      if (getValues('chatText') !== '') {
        const messageData: ChatMessageData = {
          messageType: 'chat',
          message: `[${getValues('prefix')}] ${getValues('chatText')}`,
          userName: currentUser.fullName,
          createdAt: dayjs().toString(),
          peerId: currentPeerId,
        };
        setChatContentList((prev) => {
          return [...prev, messageData];
        });

        await PeerConnection.chat(incomingPeer.current || incomingPeerId, messageData);
      }
    } finally {
      setValue('chatText', '');
    }
  };

  const handleIncomingChatMessage = (data: PeerMessageData, peerId: string) => {
    const messageData: ChatMessageData = {
      ...data,
      peerId,
    };
    setChatContentList((prev) => {
      return [...prev, messageData];
    });
  };

  const handleCall = async (peerId?: string) => {
    const peer = PeerConnection.getPeer();
    const stream = await getMediaStream();

    // @ts-ignore
    const call = peer?.call(peerId || incomingPeerId, stream || {});
    call?.on('stream', (mediaStream) => {
      // @ts-ignore
      remoteStream.current.srcObject = mediaStream;
    });
  };

  const resetPeerState = () => {
    setCurrentPeerId('');
    // @ts-ignore
    localStream.current.srcObject = null;
  };

  const actionFinishSupport = async () => {
    await catchAction(async () => {
      await finishSupportUC.run({
        id: supportItem.id,
        mentorUid: currentUser?.id,
      });
      await PeerConnection.chat(incomingPeer.current || incomingPeerId, {
        messageType: 'endSession',
        message: currentUser.id,
      });
      await PeerConnection.closePeerSession();
      setSupportStatus(SupportStatusEnum.WaitingRating);
      resetPeerState();
      setIsBlockedMicrophone(false);
      // console.log('close peer');

      socket.emit(
        EventCommand.MentorSupport,
        JSON.stringify({
          uid: currentUser.id,
          status: MentorStatusEnum.Supporting,
        }),
      );
    });
  };

  const setCountDown = () => {
    const endTime = dayjs().add(15, 'm');
    setEndSessionTime(endTime);
    setCountDownInterval = setInterval(() => {
      const currentTime = dayjs();
      const diffTime = endTime.diff(currentTime);
      if (diffTime < 0) {
        clearInterval(setCountDownInterval);
        actionFinishSupport();
      } else setSessionTimeLeft(diffTime);
    }, 1000);
  };

  const handleConnectOtherPeer = async () => {
    await PeerConnection.connectPeer(incomingPeerId);
    console.log(`Connected to peer id ${incomingPeerId}`);
    await handleCall();
    setCountDown();

    PeerConnection.onConnectionReceiveData(incomingPeerId, (data: PeerMessageData) => {
      console.log(data);

      console.info(`Receiving data handleStartSession:`, data, incomingPeerId);
      if (data.messageType === 'chat') handleIncomingChatMessage(data, incomingPeerId);
      else {
        setLiveBlockRoomId(data.message || '');
      }
    });
  };

  const handleStartMentorSession = async () => {
    setSupportStatus(SupportStatusEnum.Started);
    const id = await PeerConnection.startPeerSession();
    setCurrentPeerId(id);
    await handleConnectOtherPeer();
    PeerConnection.onIncomingCall(async (call) => {
      await getMediaStream();
      // @ts-ignore
      // eslint-disable-next-line no-restricted-globals
      call.answer(localStream.current.srcObject);
      call.on('stream', (mediaStream) => {
        // @ts-ignore
        remoteStream.current.srcObject = mediaStream;
      });
    });
  };

  /** ********START HANDLE RECALL*********** */
  const actionCancelRecall = async () => {
    await catchAction(async () => {
      await CancelRecallUC.run({ id: supportItem.id, mentorUid: currentUser?.id }).then(() =>
        toast.addToast({ status: 'success', header: t('support:rejectRequestSuccessfully') }),
      );
    });
  };

  useEffect(() => {
    if (requestExpiring === true) {
      if (supportStatus === SupportStatusEnum.Waiting) {
        PeerConnection.closePeerSession();
        resetPeerState();
        setSupportStatus(SupportStatusEnum.Expired);
      } else {
        setRequestExpiring(false);
      }
    }
  }, [requestExpiring, supportStatus]);

  const handleIncomingConnection = async (connection: DataConnection) => {
    setSupportStatus(SupportStatusEnum.Started);
    console.log(`Incoming connection handleStartSession: ${connection.peer}`);
    const peerId = connection.peer;
    incomingPeer.current = peerId;

    await handleCall(peerId);
    setCountDown();
    PeerConnection.onConnectionReceiveData(peerId, (data: PeerMessageData) => {
      console.log(`Receiving data handleStartSession:`, data, peerId);
      if (data.messageType === 'chat') handleIncomingChatMessage(data, peerId);
      else if (data.messageType === 'liveBlock') {
        setLiveBlockRoomId(data.message as string);
      } else {
        resetPeerState();
        setSupportStatus(SupportStatusEnum.WaitingRating);
        clearInterval(setCountDownInterval);
      }
    });
  };

  useEffect(() => {
    PeerConnection.onIncomingConnection(handleIncomingConnection);

    if (incomingPeer.current) {
      setSupportStatus(SupportStatusEnum.Waiting);
      PeerConnection.onConnectionDisconnected(incomingPeer.current || incomingPeerId, () => {
        actionFinishSupport();
      });
    }
  }, [incomingPeer]);

  const handleStartSession = async () => {
    return PeerConnection.startPeerSession()
      .then((id) => {
        setCurrentPeerId(id);
        requestRecallForm.setValue('peerId', id);
        console.log('file: RequestSupportForm.tsx:131  handleStartSession  sessionId ', id);
      })
      .catch((error) => {
        PeerConnection.closePeerSession();
      });
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onRecallRequest = async (_support: SupportEntity) => {
    await handleStartSession();
    requestRecallForm.setValue('id', _support.id);
    await requestRecallForm.handleSubmit(async (data: any) => {
      try {
        const support = await recallRequestUC.run(data);
        setRecallSupportId(support.id);
        socket.emit(
          EventCommand.MentorSupport,
          JSON.stringify({
            uid: currentUser?.id,
            status: StudentStatusEnum.WaitingForSupport,
          }),
        );
        navigate('/support-chat', {
          state: { isRecall: true },
        });

        setTimeout(() => {
          setRequestExpiring(true);
        }, SuportRequestExpireTimeEnum.MentorRequest);
      } catch (error) {
        setSupportStatus(SupportStatusEnum.NotStarted);
        PeerConnection.closePeerSession();
        resetPeerState();
      }
    })();
  };
  /** ********END HANDLE RECALL*********** */

  return {
    supportStatus,
    setSupportStatus,
    chatForm,
    chatContentList,
    actionEnterChat,
    chatPrefixList,
    actionFinishSupport,
    handleStartMentorSession,
    currentPeerId,
    handleConnectOtherPeer,
    localStream,
    remoteStream,
    liveBlockRoomId,
    sessionTimeLeft,
    handleCall,
    isTeacher,
    audioAllowed,
    setAudioAllowed,
    isBlockedMicrophone,
    setIsBlockedMicrophone,
    onRecallRequest,
    recallSupportId,
    actionCancelRecall,
    showDialog,
    errorDetails,
    setShowDialog,
  };
};

export default supportChatViewModel;
