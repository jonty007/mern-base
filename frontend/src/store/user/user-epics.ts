import { Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { filter, concatMap, mergeMap, catchError } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import RootState from '../state';
import { Services } from '../services';
import { RootAction } from '../action';

import { FETCH_USER_DETAILS, FETCH_USER_PROFILE_PICTURE, UPDATE_USER_PROFILE } from './user-action-names';
import { concat, Observable, of } from 'rxjs';
import { startServiceCall } from '../auth/auth-action-creators';
import {
    FetchUserDetailsAction,
    FetchUserProfilePictureAction,
    UpdateUserProfileAction,
} from '../../store/user/user-action-types';
import {
    FetchUserDetailsResponse,
    FetchUserProfilePictureResponse,
    UpdateProfilePictureResponse,
    UpdateUserProfileResponse,
} from '../../services/user/model/response-model';
import UserServiceModel from '../../services/user/model/service-model';
import {
    FetchUserDetailsRequest,
    FetchUserProfilePictureRequest,
    UpdateProfilePictureRequest,
    UpdateUserProfileRequest,
} from '../../services/user/model/request-model';
import { fetchUserProfilePicture, setUserDetails, setUserProfilePicture } from '../../store/user/user-action-creators';
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
                        of(setUserProfilePicture(response.data.imageDetails.base64)),
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
): Observable<FetchUserProfilePictureResponse> {
    const fetchUserProfileRequest: FetchUserProfilePictureRequest = {
        token: action.payload.token,
    };
    return userService.fetchUserProfilePicture(fetchUserProfileRequest);
}

const updateUserProfilePictureEpic: Epic<RootAction, RootAction, RootState, Services> = (
    action$: ActionsObservable<RootAction>,
    state$: StateObservable<RootState>,
    { userService }
) =>
    action$.pipe(
        filter(isOfType(UPDATE_USER_PROFILE)),
        concatMap((action) => {
            return concat(callUserServiceForUpdateProfilePicture(userService, action, state$.value.auth.token)).pipe(
                mergeMap((response) => {
                    const fileId: string = response.data.fileId;
                    return concat(
                        callUserServiceForUpdateUserProfile(userService, action, fileId, state$.value.auth.token)
                    ).pipe(
                        mergeMap((response) => {
                            return concat(
                                of(setUserDetails(response.data.userDetails)),
                                of(fetchUserProfilePicture(state$.value.auth.token)),
                                of(setNextStep(ActionSteps.SET_MAIN_DASHBOARD))
                            );
                        }),
                        catchError((errorResponse) => {
                            return concat(of(startServiceCall()));
                        })
                    );
                }),
                catchError((errorResponse) => {
                    return concat(of(startServiceCall()));
                })
            );
        })
    );

function callUserServiceForUpdateProfilePicture(
    userService: UserServiceModel,
    action: UpdateUserProfileAction,
    token: string
): Observable<UpdateProfilePictureResponse> {
    if (action.payload.profile) {
        const updateProfilePictureRequest: UpdateProfilePictureRequest = {
            token: token,
            profile: action.payload.profile,
        };
        return userService.updateProfilePicture(updateProfilePictureRequest);
    } else {
        const updateProfilePictureResponse: UpdateProfilePictureResponse = {
            data: {
                fileId: action.payload.profileId,
            },
        };
        return of(updateProfilePictureResponse);
    }
}

function callUserServiceForUpdateUserProfile(
    userService: UserServiceModel,
    action: UpdateUserProfileAction,
    profilePictureId: string,
    token: string
): Observable<UpdateUserProfileResponse> {
    const updateUserProfileRequest: UpdateUserProfileRequest = {
        token: token,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        dob: action.payload.dob,
        profileImageId: profilePictureId,
    };
    return userService.updateUserProfile(updateUserProfileRequest);
}

const USER_EPICS = [fetchUserDetailsEpic, fetchUserProfilePictureEpic, updateUserProfilePictureEpic];
export default USER_EPICS;
