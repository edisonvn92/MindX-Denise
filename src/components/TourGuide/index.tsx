import React, { useReducer, useEffect, useRef } from 'react';
import JoyRide, {
  Events,
  Step,
  Actions,
  Lifecycle,
  Status,
  ACTIONS,
  EVENTS,
  STATUS,
} from 'react-joyride';
import { useTourSteps } from './utils/steps';
import Tooltip from './components/Tooltip';
import { useCoreContext } from '@/core';

type CallBackProps = {
  action: Actions;
  controlled: boolean;
  index: number;
  lifecycle: Lifecycle;
  size: number;
  status: Status;
  step: Step;
  type: Events;
};

type TourGuideProps = {
  setIsEditorShown(isShown: boolean): void;
};

// Tour component
const Tour = (props: TourGuideProps) => {
  const { setIsEditorShown } = props;

  const { tours } = useTourSteps();
  const { liveBlockRoomId } = useCoreContext();

  const INITIAL_STATE = {
    key: new Date(), // This field makes the tour to re-render when we restart the tour
    run: false,
    continuous: true,
    loading: false,
    stepIndex: 0,
    steps: tours,
  };

  interface ActionState {
    type?: string;
    payload?: any;
  }

  const reducer = (state = INITIAL_STATE, action: ActionState) => {
    switch (action.type) {
      case 'START':
        return { ...state, run: true };
      case 'RESET':
        return { ...state, stepIndex: 0 };
      case 'STOP':
        return { ...state, run: false };
      case 'NEXT_OR_PREV':
        return { ...state, ...action.payload };
      case 'RESTART':
        return {
          ...state,
          stepIndex: 0,
          run: true,
          loading: false,
          key: new Date(),
        };
      default:
        return state;
    }
  };

  // Tour state is the state which control the JoyRide component
  const [tourState, dispatch] = useReducer(reducer, INITIAL_STATE);
  const joyrideRef = useRef(null);

  // Set once tour is viewed, skipped or closed
  const setTourViewed = () => {
    localStorage.setItem('tour', '1');
  };

  useEffect(() => {
    if (liveBlockRoomId) {
      setTourViewed();
    }

    // Auto start the tour if the tour is not viewed before
    if (!localStorage.getItem('tour')) {
      dispatch({ type: 'START' });
    }
  }, []);

  const callback = (data: CallBackProps) => {
    const { action, index, type, status } = data;
    if (
      // If close button clicked, then close the tour
      // If skipped or end tour, then close the tour
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      setTourViewed();
      dispatch({ type: 'STOP' });
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      if (tourState.stepIndex === 1 && action === ACTIONS.NEXT) setIsEditorShown(true);
      if (tourState.stepIndex === 2 && action === ACTIONS.PREV) setIsEditorShown(false);
      // Check whether next or back button click and update the step.
      dispatch({
        type: 'NEXT_OR_PREV',
        payload: { stepIndex: index + (action === ACTIONS.PREV ? -1 : 1) },
      });
    }
  };

  return (
    <JoyRide
      {...tourState}
      ref={joyrideRef}
      callback={callback}
      showSkipButton
      tooltipComponent={Tooltip}
    />
  );
};

export default Tour;
