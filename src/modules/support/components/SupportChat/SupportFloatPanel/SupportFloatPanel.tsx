import React, { useEffect, useState } from 'react';
import Draggable, { ControlPosition, DraggableEventHandler } from 'react-draggable';
import { Button } from '@mx/ui';
import { ChatSider } from '../ChatSider/ChatSider';
import { GetIcon } from '@/components';
import { useCoreContext } from '@/core';
import resizeHandle from '@/assets/images/resize_handle.svg';

type SupportFloatProps = {
  isMentor: boolean;
  setIsEndDialogOpened: React.Dispatch<React.SetStateAction<boolean>>;
};
type ComponentSize = {
  height: number;
  width: number;
};
export const SupportFloatPanel: React.FC<SupportFloatProps> = (props: SupportFloatProps) => {
  const { isMentor, setIsEndDialogOpened } = props;
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hideChatHeader, setHideChatHeader] = useState<boolean>(false);
  const [hideChat, setHideChat] = useState<boolean>(false);
  const componentCompactSize = { height: 76, width: isMentor ? 180 : 124 };

  const [componentExpandedSize, setComponentExpandedSize] = useState<ComponentSize>({
    height: window.innerHeight * 0.7,
    width: window.innerWidth / 4,
  });

  const [position, setPosition] = useState<ControlPosition>({
    x: window.innerWidth - componentExpandedSize.width - 40,
    y: window.innerHeight - componentExpandedSize.height - 40,
  });
  const [grabPositionOffset, setGrabPositionOffset] = useState<ControlPosition>({ x: 0, y: 0 });

  const { localStream, remoteStream, setIsBlockedMicrophone, isBlockedMicrophone } =
    useCoreContext();

  const toggleIsMuted = () => {
    if (localStream.current.srcObject?.getAudioTracks()) {
      localStream.current.srcObject.getAudioTracks()[0].enabled = isMuted;
      setIsMuted(!isMuted);
    } else {
      setIsBlockedMicrophone(!isBlockedMicrophone);
    }
  };

  useEffect(() => {
    if (isBlockedMicrophone) {
      setIsMuted(false);
    }
  }, [isBlockedMicrophone]);

  const resetPosition = () => {
    const newPosition = position;
    if (!isExpanded) {
      if (position.x > window.innerWidth - componentExpandedSize.width - 40) {
        newPosition.x = window.innerWidth - componentExpandedSize.width - 40;
      } else {
        newPosition.x = position.x + componentCompactSize.width - componentExpandedSize.width;
      }
      if (position.y > window.innerHeight - componentExpandedSize.height - 40) {
        newPosition.y = window.innerHeight - componentExpandedSize.height - 40;
      }
    } else {
      newPosition.x = position.x + componentExpandedSize.width - componentCompactSize.width;
      newPosition.y = position.y + componentExpandedSize.height - componentCompactSize.height;
    }
    setPosition(newPosition);
  };

  const onClickExpand = () => {
    resetPosition();
    setIsExpanded(!isExpanded);
  };

  const onStartDragging = (event: any, info: any) => {
    setIsDragging(true);
    // calculate offset between current grabbing position and position of component
    setGrabPositionOffset({
      x: position.x - (event.clientX || event.touches[0]?.pageX || position.x),
      y: position.y - (event.clientY || event.touches[0]?.pageY || position.y),
    });
  };

  const onDragging = (event: any, info: any) => {
    // new position is mouse position + offset calculated from start grabbing
    const newPosition = {
      x: (event.clientX || event.touches[0]?.pageX || position.x) + grabPositionOffset.x,
      y: (event.clientY || event.touches[0]?.pageY || position.y) + grabPositionOffset.y,
    };
    if (newPosition.x <= 0) newPosition.x = 0;
    if (newPosition.y <= 0) newPosition.y = 0;
    const componentWidth = isExpanded ? componentExpandedSize.width : componentCompactSize.width;
    const componentHeight = isExpanded ? componentExpandedSize.height : componentCompactSize.height;
    if (newPosition.x >= window.innerWidth - componentWidth)
      newPosition.x = window.innerWidth - componentWidth;
    if (newPosition.y >= window.innerHeight - componentHeight)
      newPosition.y = window.innerHeight - componentHeight;
    setPosition(newPosition);
  };

  const onStopDragging = (event: { type: any }, info: any) => {
    setPosition(info);
    setIsDragging(false);
  };

  const handleResize = (event: any) => {
    const startSize = isExpanded ? componentExpandedSize : componentCompactSize;
    const startPosition = {
      x: event.pageX || event.touches[0].pageX,
      y: event.pageY || event.touches[0].pageY,
    };

    function onStartHandler(startEvent: any) {
      startEvent.preventDefault();
    }

    function onMoveHandler(moveEvent: any) {
      setIsExpanded(true);
      setComponentExpandedSize((currentSize) => {
        let newWidth =
          startSize.width + startPosition.x - (moveEvent.pageX || moveEvent.touches[0].pageX);
        const newHeight =
          startSize.height + startPosition.y - (moveEvent.pageY || moveEvent.touches[0].pageY);
        if (newWidth < componentCompactSize.width) newWidth = componentCompactSize.width;
        if (newWidth < componentCompactSize.width + 42) setHideChatHeader(true);
        else setHideChatHeader(false);
        if (newHeight < componentCompactSize.height + 150) {
          setIsExpanded(false);
          setComponentExpandedSize({
            height: window.innerHeight * 0.7,
            width: window.innerWidth / 4,
          });
        } else {
          setIsExpanded(true);
          setHideChat(false);
        }

        return {
          width: newWidth,
          height: newHeight,
        };
      });
    }

    function onReleaseHandler() {
      document.body.removeEventListener('mousemove', onMoveHandler);
      document.body.removeEventListener('touchmove', onMoveHandler);
      document.body.removeEventListener('mousedown', onStartHandler);
      document.body.removeEventListener('touchstart', onStartHandler);
    }
    document.body.addEventListener('mousedown', onStartHandler);
    document.body.addEventListener('touchstart', onStartHandler);
    document.body.addEventListener('mousemove', onMoveHandler);
    document.body.addEventListener('mouseup', onReleaseHandler, { once: true });

    document.body.addEventListener('touchmove', onMoveHandler);
    document.body.addEventListener('touchend', onReleaseHandler, { once: true });
  };

  return (
    <Draggable
      bounds="parent"
      position={position}
      handle=".handler"
      onStart={onStartDragging}
      onDrag={onDragging as DraggableEventHandler}
      onStop={onStopDragging}
    >
      <div
        className={`z-5 absolute bg-mx-white border-mx-gray-200 rounded-xl border border-solid light04 ${
          isDragging ? '' : 'duration-500'
        } `}
        style={{
          width: isExpanded ? componentExpandedSize.width : componentCompactSize.width,
          height: isExpanded ? componentExpandedSize.height : componentCompactSize.height,
        }}
      >
        <div
          className={` overflow-hidden ${isExpanded ? 'w-full h-full pt-4' : 'w-0 h-0'}  ${
            isDragging ? '' : 'duration-500'
          } ${hideChat ? 'hidden' : ''} `}
        >
          <ChatSider hideHeader={hideChatHeader} />
        </div>

        <div
          className="handler w-full h-[74px] z-auto absolute top-1"
          style={{ cursor: 'url(/src/assets/images/hand_cursor_grab.svg), auto' }}
        >
          <GetIcon className="w-4 h-4 absolute top-0 right-0 left-0 m-auto " icon="IoMenuOutline" />
        </div>

        <button
          className="handler absolute top-0 left-0.5 z-10 cursor-nwse-resize w-6 h-6 pl-0 pt-0 border-none bg-mx-white rounded-xl"
          onMouseDown={handleResize}
          onTouchStart={handleResize}
          type="button"
        >
          <img src={resizeHandle} alt="resize_handle" />
        </button>
        <div className="rounded-xl flex absolute top-5 right-[10px] z-10 gap-2">
          <Button
            leftIcon={
              <GetIcon
                icon={isMuted ? 'IoMicOutline' : 'IoMicOffOutline'}
                className={`h-6 w-6 ${isBlockedMicrophone ? 'text-mx-gray-200' : ''}`}
              />
            }
            iconOnly
            type="filled-secondary"
            size="large"
            className="p-3"
            onClick={toggleIsMuted}
          />
          <Button
            leftIcon={
              isExpanded ? (
                <GetIcon icon="IoContractOutline" className="h-6 w-6" />
              ) : (
                <GetIcon icon="IoExpandOutline" className="h-6 w-6" />
              )
            }
            type="filled-secondary"
            className="p-3"
            iconOnly
            size="large"
            onClick={onClickExpand}
          />
          {isMentor ? (
            <Button
              leftIcon={<GetIcon icon="IoCallOutline" className="h-6 w-6 text-mx-red-500" />}
              type="outlined-danger"
              className="border-none p-3"
              iconOnly
              size="large"
              onClick={() => setIsEndDialogOpened(true)}
            />
          ) : undefined}
        </div>
        <video ref={localStream} muted autoPlay src="" id="localStream" className="w-0 h-0">
          <track />
        </video>
        <video ref={remoteStream} autoPlay src="" id="remoteStream" className="w-0 h-0">
          <track />
        </video>
      </div>
    </Draggable>
  );
};
