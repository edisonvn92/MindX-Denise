import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@mx/ui';
import Draggable, { ControlPosition } from 'react-draggable';
import { StudentLessonInLiveBlock } from './StudentLessonInLiveBlock/StudentLessonInLiveBlock';
import { ContentSizeEnum } from '@/core/context/AppContext';
import { GetIcon } from '@/components';
import resizeHandle from '@/assets/images/resize_handle.svg';
import './index.scss';

interface DraggableStudentLessonProps {
  isEditorShown: boolean;
  setIsEditorShown: React.Dispatch<React.SetStateAction<boolean>>;
}

/* eslint-disable */
enum DragComponentStatus {
  FullScreen = 'FULL_SCREEN',
  NotDragged = 'NOT_DRAGGED',
  FirstDrag = 'FIRST_DRAG',
  Dragging = 'DRAGGING',
  Dragged = 'DRAGGED',
}
/* eslint-disable */

type ComponentSize = {
  height: number | string;
  width: number | string;
};

export const DraggableStudentLesson = (props: DraggableStudentLessonProps) => {
  const { isEditorShown, setIsEditorShown } = props;
  const dragRef = useRef(null);
  const [dragStatus, setDragStatus] = useState<DragComponentStatus>(DragComponentStatus.FullScreen);
  const [componentSize, setComponentSize] = useState<ComponentSize>({
    height: '100%',
    width: '100%',
  });
  const [componentStyleClass, setComponentStyleClass] = useState<string>('full-screen-component');
  const componentCompactSize = { height: 40, width: 104 };
  const [iconPosition, setIconPosition] = useState<string | number>(window.innerWidth * 0.13);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const [componentExpandedSize, setComponentExpandedSize] = useState<ComponentSize>({
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
  });

  const [position, setPosition] = useState<ControlPosition>({ x: 0, y: 0 });
  const [draggableSize, setDraggableSize] = useState<ContentSizeEnum>(ContentSizeEnum.ExtraLarge);
  const [grabPositionOffset, setGrabPositionOffset] = useState<ControlPosition>({ x: 0, y: 0 });
  const eventControl = (event: { type: any }) => {
    if (event.type === 'mousemove' || event.type === 'touchmove') {
      if (dragStatus === DragComponentStatus.NotDragged)
        setDragStatus(DragComponentStatus.FirstDrag);
      else if (dragStatus === DragComponentStatus.Dragged)
        setDragStatus(DragComponentStatus.Dragging);
    }

    if (event.type === 'mouseup' || event.type === 'touchend') {
      if (
        dragStatus === DragComponentStatus.FirstDrag ||
        dragStatus === DragComponentStatus.Dragging
      )
        setDragStatus(DragComponentStatus.Dragged);
    }
  };
  const onStart = (event: any, info: any) => {
    eventControl(event);
    setGrabPositionOffset({
      x: position.x - (event.clientX || event.touches[0]?.pageX || position.x),
      y: position.y - (event.clientY || event.touches[0]?.pageY || position.y),
    });
  };

  const setComponentPositionWithinBound = (pos: ControlPosition) => {
    const newPos = { ...pos };
    if (newPos.x > window.innerWidth - (componentSize.width as number) - 40) {
      newPos.x = window.innerWidth - (componentSize.width as number) - 40;
    }
    if (newPos.x < 40) newPos.x = 40;
    if (newPos.y > window.innerHeight - (componentSize.height as number) - 80) {
      newPos.y = window.innerHeight - (componentSize.height as number) - 80;
    }
    if (newPos.y < 40) newPos.y = 40;
    return newPos;
  };

  const onDrag = (event: any, info: any) => {
    eventControl(event);
    if (dragStatus !== DragComponentStatus.FullScreen) {
      const newPosition = {
        x: (event.clientX || event.touches[0]?.pageX || position.x) + grabPositionOffset.x,
        y: (event.clientY || event.touches[0]?.pageY || position.y) + grabPositionOffset.y,
      };

      if (newPosition.x <= 0) newPosition.x = 0;
      if (newPosition.y <= 0) newPosition.y = 0;
      if (newPosition.x >= window.innerWidth - (componentSize.width as number))
        newPosition.x = window.innerWidth - (componentSize.width as number);
      if (newPosition.y >= window.innerHeight - (componentSize.height as number))
        newPosition.y = window.innerHeight - (componentSize.height as number);
      setPosition(setComponentPositionWithinBound(newPosition));
    }
  };

  const onStopDragging = (event: { type: any }, info: any) => {
    eventControl(event);
  };

  const resetHiddenState = () => {
    setDragStatus(DragComponentStatus.NotDragged);
  };

  const onClickResize = () => {
    setIsEditorShown(false);
  };

  const resizeDraggable = (ev: KeyboardEvent) => {
    if (dragStatus === DragComponentStatus.Dragged) {
      let newSize = { ...componentExpandedSize };
      if (ev.ctrlKey && ev.shiftKey) {
        if (ev.key === '!') {
          newSize = {
            height: window.innerHeight / 3,
            width: window.innerWidth / 3,
          };
        }
        if (ev.key === '@') {
          newSize = {
            height: window.innerHeight / 2,
            width: window.innerWidth / 2,
          };
        }
        if (ev.key === '#') {
          newSize = {
            height: window.innerHeight * 0.66,
            width: window.innerWidth * 0.66,
          };
        }
      }
      setComponentSize(newSize);
      setComponentExpandedSize(newSize);
    }
  };

  const handleDragResize = (event: any) => {
    const startSize = componentSize;
    const startPosition = {
      x: event.pageX || event.touches[0].pageX,
      y: event.pageY || event.touches[0].pageY,
    };

    function onStartHandler(startEvent: any) {
      startEvent.preventDefault();
    }

    function onMoveHandler(moveEvent: any) {
      setIsResizing(true);
      let newWidth =
        startSize.width + startPosition.x - (moveEvent.pageX || moveEvent.touches[0].pageX);
      let newHeight =
        startSize.height + startPosition.y - (moveEvent.pageY || moveEvent.touches[0].pageY);
      if (newWidth < window.innerWidth / 3) newWidth = window.innerWidth / 3;
      if (newHeight < window.innerHeight / 3) newHeight = window.innerHeight / 3;

      setComponentExpandedSize({
        width: newWidth,
        height: newHeight,
      });
      setComponentSize({
        width: newWidth,
        height: newHeight,
      });
    }
    function onReleaseHandler() {
      document.body.removeEventListener('mousemove', onMoveHandler);
      document.body.removeEventListener('touchmove', onMoveHandler);
      document.body.removeEventListener('mousedown', onStartHandler);
      document.body.removeEventListener('touchstart', onStartHandler);
      setIsResizing(false);
    }

    document.body.addEventListener('mousedown', onStartHandler);
    document.body.addEventListener('touchstart', onStartHandler);
    document.body.addEventListener('mousemove', onMoveHandler);
    document.body.addEventListener('mouseup', onReleaseHandler, { once: true });
    document.body.addEventListener('touchmove', onMoveHandler);
    document.body.addEventListener('touchend', onReleaseHandler, { once: true });
  };

  useEffect(() => {
    if (isEditorShown) {
      setDragStatus(DragComponentStatus.NotDragged);
    } else {
      setDragStatus(DragComponentStatus.FullScreen);
    }
  }, [isEditorShown]);

  useEffect(() => {
    window.addEventListener('keyup', resizeDraggable);
    return () => window.removeEventListener('keyup', resizeDraggable);
  }, [position]);

  useEffect(() => {
    switch (dragStatus) {
      case DragComponentStatus.FullScreen:
        setDraggableSize(ContentSizeEnum.ExtraLarge);
        setComponentSize({
          width: '100%',
          height: '100%',
        });
        setPosition({ x: 0, y: 0 });
        setIconPosition(window.innerWidth * 0.13);
        break;
      case DragComponentStatus.NotDragged:
        setComponentSize({ height: 40, width: 208 });
        setPosition({ x: window.innerWidth * 0.87 - componentCompactSize.width * 2, y: 0 });
        setComponentStyleClass('rounded-b-xl');
        setIconPosition(0);
        break;
      case DragComponentStatus.FirstDrag:
        setDraggableSize(ContentSizeEnum.Small);
        setComponentSize({
          height: window.innerHeight / 4,
          width: window.innerWidth / 4,
        });
        setComponentStyleClass('rounded-xl light05');
        setIconPosition('20%');
        break;
      case DragComponentStatus.Dragged:
        setComponentSize(componentExpandedSize);
        break;
      default:
        break;
    }
  }, [dragStatus]);

  useEffect(() => {
    if (dragStatus === DragComponentStatus.Dragged)
      setPosition(setComponentPositionWithinBound(position));
    if (dragStatus === DragComponentStatus.Dragging || dragStatus === DragComponentStatus.Dragged) {
      if (
        (componentSize.width as number) < window.innerWidth / 2 ||
        (componentSize.height as number) < window.innerHeight / 2
      ) {
        setDraggableSize(ContentSizeEnum.Small);
      } else if (
        (componentSize.width as number) >= window.innerWidth * 0.66 &&
        (componentSize.height as number) >= window.innerHeight * 0.66
      ) {
        setDraggableSize(ContentSizeEnum.Large);
      } else {
        setDraggableSize(ContentSizeEnum.Medium);
      }
    }
  }, [componentSize, dragStatus]);

  return (
    <Draggable
      bounds="parent"
      position={position}
      handle=".handler"
      onStart={onStart}
      onDrag={onDrag}
      onStop={onStopDragging}
    >
      <div
        ref={dragRef}
        className={` bg-mx-white ease-out z-[998] ${componentStyleClass}`}
        style={{
          // transition: isResizing ? '' : 'width 0.5s, height 0.5s',
          width: componentSize.width,
          height: componentSize.height,
          // zIndex: isEditorShown ? 2 : 0,
        }}
        onClick={() => {
          if (dragStatus === DragComponentStatus.NotDragged) setIsEditorShown(false);
        }}
      >
        <div
          id="handler"
          className={`handler absolute bg-transparent top-0 left-0 w-full h-10 ${
            dragStatus === DragComponentStatus.Dragging ||
            dragStatus === DragComponentStatus.FirstDrag
              ? 'cursor-grabbing'
              : 'cursor-grab'
          }`}
        >
          <div
            className={`absolute top-0 light03 rounded-b-xl h-10 ${
              isEditorShown ? 'bg-mx-blue-100' : 'bg-mx-gray-100'
            } ${
              dragStatus === DragComponentStatus.FullScreen ||
              dragStatus === DragComponentStatus.NotDragged
                ? 'w-[208px]'
                : 'w-[104px]'
            }`}
            style={{ right: iconPosition }}
          >
            <div
              className={`flex justify-center rounded-b-xl h-10 w-[104px] ${
                isEditorShown ? 'bg-mx-blue-100' : 'bg-mx-white'
              }`}
            >
              <GetIcon icon="IoTv" className="text-mx-blue-400 w-5 h-5 m-auto" />
            </div>
          </div>
        </div>

        <div
          className={`h-full w-full ${
            dragStatus === DragComponentStatus.NotDragged ? 'hidden' : ''
          }`}
        >
          <StudentLessonInLiveBlock
            contentSize={draggableSize}
            setIsEditorShown={setIsEditorShown}
            isResizing={isResizing}
          />
        </div>

        {dragStatus === DragComponentStatus.Dragged ||
        dragStatus === DragComponentStatus.Dragging ? (
          <>
            <button
              className="handler absolute top-0 left-0.5 z-10 cursor-nwse-resize w-6 h-6 pl-0 pt-0 border-none bg-mx-white rounded-xl"
              onMouseDown={handleDragResize}
              onTouchStart={handleDragResize}
              type="button"
            >
              <img src={resizeHandle} alt="resize_handle" />
            </button>
            <Button
              leftIcon={<GetIcon icon="IoCloseOutline" className="w-5 h-5" />}
              iconOnly
              type="filled-secondary"
              size="large"
              className="absolute top-2 right-2 z-5 px-[4px] py-[4px]"
              onClick={resetHiddenState}
            />
            <Button
              leftIcon={<GetIcon icon="IoResizeOutline" className="w-5 h-5" />}
              iconOnly
              type="filled-secondary"
              size="large"
              className="absolute top-2 right-10 z-5 px-[4px] py-[4px]"
              onClick={onClickResize}
            />
          </>
        ) : undefined}
      </div>
    </Draggable>
  );
};
