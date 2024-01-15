import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataConnection } from 'peerjs';
import getUserMedia from 'get-user-media-promise';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useLocation } from 'react-router-dom';
import { useToast } from '@mx/ui';
import { SupportHttpRepository } from '../adapters/repositories';
import { SuportRequestExpireTimeEnum, SupportStatusEnum } from '../helper/SupportStatusEnum';
import {
  DialogType,
  MediaPermissionsError,
} from '../components/RemindMicrophone/MediaOnboardingDialog';
import { requestMediaPermissions } from '../utils/requestMediaPermissons';
import {
  CancelSupportUseCase,
  EvaluateSupportUseCase,
  FinishSupportUseCase,
  RequestSupportUseCase,
} from '@/domains/support/usecases';
import { useAppContext, useBaseViewModel, useSocketContext } from '@/core';
import { Message as PeerMessageData, PeerConnection, ChatMessageData } from '@/helpers/peer';
import { useDataLayerAction } from '@/core/context/TagContext';
import { socket } from '@/core/context/SocketContext';
import { EventCommand, StudentStatusEnum } from '@/domains/realtime-dashboard/entities';
import {
  AcceptRecallRequestPayload,
  RejectRecallRequestPayload,
} from '@/domains/support/ports/payloads/recall.payload';
import { RejectRecallRequestUseCase } from '@/domains/support/usecases/reject-recall.usecase';
import { AcceptRecallRequestUseCase } from '@/domains/support/usecases/accept-recall.usecase';

dayjs.extend(duration);

const studentLessonWithSupport = () => {
  const { t, currentUser } = useAppContext();
  const supportRepo = new SupportHttpRepository();
  const requestSupportUC = new RequestSupportUseCase(supportRepo);
  const cancelSupportUC = new CancelSupportUseCase(supportRepo);
  const evaluateSupportUC = new EvaluateSupportUseCase(supportRepo);
  const finishSupportUC = new FinishSupportUseCase(supportRepo);
  const rejectRecallUC = new RejectRecallRequestUseCase(supportRepo);
  const acceptRecallUC = new AcceptRecallRequestUseCase(supportRepo);

  const { catchAction } = useBaseViewModel();
  const [supportStatus, setSupportStatus] = useState<SupportStatusEnum>(
    SupportStatusEnum.NotStarted,
  );
  const [isRequestSupportPanelOpened, setIsRequestSupportPanelOpened] = useState<boolean>(false);
  const [requestExpiring, setRequestExpiring] = useState<boolean>(false);
  const [supportId, setSupportId] = useState('');
  const location = window.location.href.split('/');
  const studentLessonId = location[location.length - 1];

  const [currentPeerId, setCurrentPeerId] = useState('ExampleID');
  const [incomingPeerId, setIncomingPeerId] = useState<string>('');
  const [chatContentList, setChatContentList] = useState<ChatMessageData[]>([]);
  const [mentorUid, setMentorId] = useState<string>('');
  const localStream = useRef<HTMLVideoElement>(null);
  const remoteStream = useRef<HTMLVideoElement>(null);

  const [liveBlockRoomId, setLiveBlockRoomId] = useState<string>(
    `${crypto.randomUUID()}-${studentLessonId}`,
  );
  const [endSessionTime, setEndSessionTime] = useState<Dayjs>(dayjs().add(15, 'm'));
  const [sessionTimeLeft, setSessionTimeLeft] = useState<number>(900000);
  const [isBlockedMicrophone, setIsBlockedMicrophone] = useState<boolean>(false);
  const [audioAllowed, setAudioAllowed] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<DialogType | null>(null);
  const [errorDetails, setErrorDetails] = useState<MediaPermissionsError | undefined>();

  const sessionStartLesson = new Date().getTime();

  const dataLayerAction = useDataLayerAction();

  const { state } = useLocation();

  const toast = useToast();

  const { recallData, setRecallData } = useSocketContext();

  let setCountDownInterval: any;

  const defaultRequestSupportValue = {
    courseId: '',
    lessonId: '',
    studentId: currentUser.id,
    question: '',
    peerId: '',
    liveBlockId: liveBlockRoomId,
  };

  const requestSupportForm = useForm({
    mode: 'onTouched',
    defaultValues: defaultRequestSupportValue,
    values: defaultRequestSupportValue,
  });

  const chatPrefixList = [
    t('support:notUnderstand'),
    t('support:teachAgain'),
    t('support:practiceAgain'),
  ];

  const defaultChatFormValue = {
    chatText: '',
    prefix: chatPrefixList[0],
  };

  const chatForm = useForm({
    mode: 'onTouched',
    defaultValues: defaultChatFormValue,
    values: defaultChatFormValue,
  });

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
          return getUserMedia({ video: false, audio: true });
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

  const resetPeerState = () => {
    setRecallData(null);
    setCurrentPeerId('');
    setIncomingPeerId('');
    setChatContentList([]);
    // @ts-ignore
    if (localStream.current) localStream.current.srcObject = null;
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
    const call = peer?.call(peerId || incomingPeerId, stream);
    call?.on('stream', (mediaStream) => {
      // @ts-ignore
      remoteStream.current.srcObject = mediaStream;
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
      } else setSessionTimeLeft(diffTime);
    }, 1000);
  };

  const handleIncomingConnection = async (connection: DataConnection) => {
    setSupportStatus(SupportStatusEnum.MentorFound);
    console.log(`Incoming connection handleStartSession: ${connection.peer}`);
    const peerId = connection.peer;
    setIncomingPeerId(peerId);
    try {
      await handleCall(peerId);
    } finally {
      setIsRequestSupportPanelOpened(false);
      setSupportStatus(SupportStatusEnum.Started);
    }

    setCountDown();
    PeerConnection.onConnectionReceiveData(peerId, (data: PeerMessageData) => {
      console.log(`Receiving data handleStartSession:`, data, peerId);
      if (data.messageType === 'chat') handleIncomingChatMessage(data, peerId);
      else {
        resetPeerState();
        setSupportStatus(SupportStatusEnum.WaitingRating);
        setMentorId(data.message || '');
        clearInterval(setCountDownInterval);
      }
    });

    PeerConnection.onIncomingCall(async (call) => {
      // @ts-ignore
      // eslint-disable-next-line no-restricted-globals
      call.answer(localStream.current.srcObject);
      call.on('stream', (mediaStream) => {
        // @ts-ignore
        remoteStream.current.srcObject = mediaStream;
      });
    });
  };

  const handleStartSession = async () => {
    return PeerConnection.startPeerSession()
      .then((id) => {
        setCurrentPeerId(id);
        requestSupportForm.setValue('peerId', id);
        console.log('file: RequestSupportForm.tsx:131  handleStartSession  sessionId ', id);

        PeerConnection.onIncomingConnection(handleIncomingConnection);
      })
      .catch((error) => {
        toast.addToast({ status: 'error', header: t('common:error'), description: error.message });
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmitRequest = async () => {
    setSupportStatus(SupportStatusEnum.Waiting);
    await handleStartSession().catch((error) => {
      throw new Error(error);
    });
    await requestSupportForm.handleSubmit(async (data: any) => {
      if (data?.courseId) {
        // eslint-disable-next-line no-param-reassign
        delete data.courseId;
      }
      try {
        const support = await requestSupportUC.run(data);
        setSupportId(support.id);

        socket.emit(
          EventCommand.StudentSupport,
          JSON.stringify({
            uid: currentUser?.id,
            lessonId: state?.lesson?.id,
            courseId: state?.courseId,
            status: StudentStatusEnum.WaitingForSupport,
          }),
        );

        // Push live support information to GTM
        dataLayerAction({
          event: 'LIVE_SUPPORT',
          data: {
            user_id: support?.studentId,
            status: support?.status,
            supportId: support?.id,
            mentorUid: support?.mentorUid,
            question: support?.question,
            lessonName: support?.lessonName,
          },
        });

        // set request expiring after 5 minutes
        setTimeout(() => {
          setRequestExpiring(true);
        }, SuportRequestExpireTimeEnum.StudentRequest);
      } catch (error) {
        setSupportStatus(SupportStatusEnum.NotStarted);
      }
    })();
  };

  useEffect(() => {
    if (supportStatus === SupportStatusEnum.NotStarted) {
      socket.emit(
        EventCommand.StudentLearn,
        JSON.stringify({
          uid: currentUser?.id,
          lessonId: state?.lesson?.id,
          courseId: state?.courseId,
        }),
      );
    }
  }, [supportStatus]);

  useEffect(() => {
    if (requestExpiring === true) {
      if (supportStatus === SupportStatusEnum.Waiting) {
        PeerConnection.closePeerSession();
        resetPeerState();
        setSupportStatus(SupportStatusEnum.Expired);
        setIsBlockedMicrophone(false);

        socket.emit(
          EventCommand.StudentSupport,
          JSON.stringify({
            uid: currentUser?.id,
            lessonId: state?.lesson?.id,
            courseId: state?.courseId,
            status: StudentStatusEnum.NotBeFoundMentor,
            reason: 'Không có mentor đang trực',
          }),
        );
      } else {
        setRequestExpiring(false);
      }
    }
  }, [requestExpiring, supportStatus]);

  const actionCancelSupport = async () => {
    await catchAction(async () => {
      await cancelSupportUC.run({
        id: supportId,
        studentId: currentUser.id,
      });
      await PeerConnection.closePeerSession();
    });
  };

  const actionEnterChat = async () => {
    try {
      if (chatForm.getValues('chatText') !== '') {
        const messageData: ChatMessageData = {
          messageType: 'chat',
          message: `[${chatForm.getValues('prefix')}] ${chatForm.getValues('chatText')}`,
          userName: currentUser.fullName,
          createdAt: dayjs().toString(),
          peerId: currentPeerId,
        };
        setChatContentList((prev) => {
          return [...prev, messageData];
        });
        await PeerConnection.chat(incomingPeerId, messageData);
      }
    } finally {
      console.log('reset');
      chatForm.setValue('chatText', '');
    }
  };

  const actionRateSession = async (rate: boolean) => {
    setSupportStatus(SupportStatusEnum.NotStarted);
    await evaluateSupportUC.run({
      id: supportId,
      isSatisfied: rate,
      mentorUid,
    });
    await PeerConnection.closePeerSession();
  };

  /** ***********START HANDLE RE_CALL************** */
  const actionRejectRecall = async (payload: RejectRecallRequestPayload) => {
    await catchAction(async () => {
      await rejectRecallUC
        .run(payload)
        .then(() =>
          toast.addToast({ status: 'success', header: t('support:rejectRequestSuccessfully') }),
        );
    });
  };

  const actionAcceptRecallSupport = async (payload: AcceptRecallRequestPayload) => {
    await catchAction(async () => {
      await acceptRecallUC.run(payload);
    });
  };

  const handleConnectOtherPeer = async (peerId: string) => {
    setIncomingPeerId(peerId);
    console.log(`Connecting to other peerid ${peerId}`);
    await PeerConnection.connectPeer(peerId).catch((err) =>
      toast.addToast({ status: 'error', description: err.message }),
    );
    console.log(`Connected to peer id ${peerId}`);
    await handleCall(peerId);
    setCountDown();
    await PeerConnection.chat(peerId, {
      messageType: 'liveBlock',
      message: liveBlockRoomId,
    });
    PeerConnection.onConnectionReceiveData(peerId, (data: PeerMessageData) => {
      console.info(`Receiving data handleStartSession:`, data, peerId);
      if (data.messageType === 'chat') handleIncomingChatMessage(data, peerId);
      else {
        setLiveBlockRoomId(data.message || '');
        resetPeerState();
        setSupportStatus(SupportStatusEnum.WaitingRating);
        setMentorId(data.message || '');
        clearInterval(setCountDownInterval);
      }
    });

    PeerConnection.onConnectionDisconnected(peerId, () => {
      toast.addToast({ status: 'error', description: 'Opps! You are disconnected' });
    });
  };

  const handleStartRecallSession = async () => {
    const id = await PeerConnection.startPeerSession();
    setCurrentPeerId(id);
    await handleConnectOtherPeer(recallData?.detail.peerId);
    PeerConnection.onIncomingCall(async (call) => {
      const stream = await getUserMedia({ video: false, audio: true });
      // @ts-ignore
      localStream.current.srcObject = stream;
      // eslint-disable-next-line no-restricted-globals
      call.answer(stream);
      call.on('stream', (mediaStream) => {
        // @ts-ignore
        remoteStream.current.srcObject = mediaStream;
      });
    });
  };

  useEffect(() => {
    const recallPayload = {
      id: recallData?.detail?.supportId,
      studentId: currentUser.id || '',
    };

    if (recallData?.isAccept) {
      setSupportStatus(SupportStatusEnum.Started);
      actionAcceptRecallSupport(recallPayload);
      handleStartRecallSession();
    } else if (recallData?.isReject) {
      setSupportStatus(SupportStatusEnum.NotStarted);
      actionRejectRecall(recallPayload);
    }
  }, [recallData]);

  /** ***********END HANDLE RE_CALL************** */

  return {
    requestSupportForm,
    onSubmitRequest,
    actionCancelSupport,
    supportStatus,
    setSupportStatus,
    isRequestSupportPanelOpened,
    setIsRequestSupportPanelOpened,
    supportId,
    currentPeerId,
    handleStartSession,
    chatContentList,
    setChatContentList,
    chatForm,
    actionEnterChat,
    chatPrefixList,
    localStream,
    remoteStream,
    actionRateSession,
    liveBlockRoomId,
    setLiveBlockRoomId,
    sessionTimeLeft,
    sessionStartLesson,
    audioAllowed,
    setAudioAllowed,
    isBlockedMicrophone,
    setIsBlockedMicrophone,
    actionAcceptRecallSupport,
    showDialog,
    errorDetails,
    setShowDialog,
  };
};

export default studentLessonWithSupport;
