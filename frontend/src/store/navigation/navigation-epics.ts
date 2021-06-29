import { Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { tap, ignoreElements, filter } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import RootState from '../../store/state';
import { Services } from '../../store/services';
import { RootAction } from '../../store/action';

import { STEP_ROUTE_MAP } from '../../routing/constants/step-route-map';

import { SET_NEXT_STEP } from './navigation-action-names';
import { isNotBlankString } from '../../utils/string-utils';

const setNextStepEpic: Epic<RootAction, RootAction, RootState, Services> = (
    action$: ActionsObservable<RootAction>,
    state$: StateObservable<RootState>,
    { history }
) =>
    action$.pipe(
        filter(isOfType(SET_NEXT_STEP)),
        tap((action) => {
            if (isNotBlankString(STEP_ROUTE_MAP[action.payload.step])) {
                history.push(STEP_ROUTE_MAP[action.payload.step]);
            }
        }),
        ignoreElements()
    );

export default [setNextStepEpic];
