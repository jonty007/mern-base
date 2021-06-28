import { SET_NEXT_STEP } from '../../store/navigation/navigation-action-names';
import { SetNextStepAction } from '../../store/navigation/navigation-action-types';

export function setNextStep(step: string): SetNextStepAction {
    console.log('action creator called');
    return {
        type: SET_NEXT_STEP,
        payload: {
            step: step,
        },
    };
}
