import produce from 'immer';
import NavigationState from './navigation-state';
import { INITIAL_NAVIGATION_STATE } from '../initial-state';
import { SetNextStepPayload } from '../../store/navigation/navigation-action-payloads';
import { NavigationActionTypes } from '../../store/navigation/navigation-action-types';
import { SET_NEXT_STEP } from '../../store/navigation/navigation-action-names';

const setNextStep = produce((draftState: NavigationState, payload: SetNextStepPayload) => {
    draftState.stepsList.push(payload.step);
});

export default function navigationReducer(
    state = INITIAL_NAVIGATION_STATE,
    action: NavigationActionTypes
): NavigationState {
    switch (action.type) {
        case SET_NEXT_STEP:
            return setNextStep(state, action.payload);
        default:
            return state;
    }
}
