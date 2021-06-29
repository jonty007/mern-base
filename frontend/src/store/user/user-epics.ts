import { Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { filter, concatMap, mergeMap, catchError } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import RootState from '../state';
import { Services } from '../services';
import { RootAction } from '../action';

import { FETCH_USER_DETAILS, FETCH_USER_PROFILE_PICTURE } from './user-action-names';
import { concat, Observable, of } from 'rxjs';
import { startServiceCall } from '../auth/auth-action-creators';
import { FetchUserDetailsAction, FetchUserProfilePictureAction } from '../../store/user/user-action-types';
import { FetchUserDetailsResponse, FetchUserProfileResponse } from '../../services/user/model/response-model';
import UserServiceModel from '../../services/user/model/service-model';
import { FetchUserDetailsRequest, FetchUserProfileRequest } from '../../services/user/model/request-model';
import { setUserDetails, setUserProfilePicture } from '../../store/user/user-action-creators';
import { setNextStep } from '../../store/navigation/navigation-action-creators';
import { ActionSteps } from '../../routing/constants/steps';

const fetchUserDetailsEpic: Epic<RootAction, RootAction, RootState, Services> = (
    action$: ActionsObservable<RootAction>,
    state$: StateObservable<RootState>,
    { userService }
) =>
    action$.pipe(
        filter(isOfType(FETCH_USER_DETAILS)),
        concatMap((action) => {
            return concat(callUserServiceForFetchDetails(userService, action)).pipe(
                mergeMap((response) => {
                    return concat(
                        of(setUserDetails(response.data.userDetails)),
                        of(setNextStep(ActionSteps.SET_MAIN_DASHBOARD))
                    );
                }),
                catchError((errorResponse) => {
                    return concat(of(startServiceCall()));
                })
            );
        })
    );

function callUserServiceForFetchDetails(
    userService: UserServiceModel,
    action: FetchUserDetailsAction
): Observable<FetchUserDetailsResponse> {
    const fetchUserDetailsRequest: FetchUserDetailsRequest = {
        token: action.payload.token,
    };
    return userService.fetchUserDetails(fetchUserDetailsRequest);
}

const fetchUserProfilePictureEpic: Epic<RootAction, RootAction, RootState, Services> = (
    action$: ActionsObservable<RootAction>,
    state$: StateObservable<RootState>,
    { userService }
) =>
    action$.pipe(
        filter(isOfType(FETCH_USER_PROFILE_PICTURE)),
        concatMap((action) => {
            return concat(callUserServiceForFetchProfilePicture(userService, action)).pipe(
                mergeMap((response) => {
                    return concat(
                        of(setUserProfilePicture(response.profile)),
                        of(setNextStep(ActionSteps.SET_MAIN_DASHBOARD))
                    );
                }),
                catchError((errorResponse) => {
                    return concat(of(startServiceCall()));
                })
            );
        })
    );

function callUserServiceForFetchProfilePicture(
    userService: UserServiceModel,
    action: FetchUserProfilePictureAction
): Observable<FetchUserProfileResponse> {
    const fetchUserProfileRequest: FetchUserProfileRequest = {
        token: action.payload.token,
    };
    return userService.fetchUserProfile(fetchUserProfileRequest);
}

const USER_EPICS = [fetchUserDetailsEpic, fetchUserProfilePictureEpic];
export default USER_EPICS;
