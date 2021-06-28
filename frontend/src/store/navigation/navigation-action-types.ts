import { SET_NEXT_STEP } from '../../store/navigation/navigation-action-names';
import { SetNextStepPayload } from '../../store/navigation/navigation-action-payloads';

export interface SetNextStepAction {
    type: typeof SET_NEXT_STEP;
    payload: SetNextStepPayload;
}

export type NavigationActionTypes = SetNextStepAction;
