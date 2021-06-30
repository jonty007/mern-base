import { Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { filter, concatMap, mergeMap, catchError } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import RootState from '../state';
import { Services } from '../services';
import { RootAction } from '../action';

import {
    FETCH_USER_DETAILS,
    FETCH_USER_PROFILE_PICTURE,
    UPDATE_USER_PASSWORD,
    UPDATE_USER_PROFILE,
    UPDATE_USER_PROFILE_PICTURE,
} from './user-action-names';
import { concat, Observable, of } from 'rxjs';
import { startServiceCall } from '../auth/auth-action-creators';
import {
    FetchUserDetailsAction,
    FetchUserProfilePictureAction,
    UpdateUserPasswordAction,
    UpdateUserProfileAction,
    UpdateUserProfilePictureAction,
} from '../../store/user/user-action-types';
import {
    FetchUserDetailsResponse,
    FetchUserProfilePictureResponse,
    UpdateProfilePictureResponse,
    UpdateUserPasswordResponse,
    UpdateUserProfileResponse,
} from '../../services/user/model/response-model';
import UserServiceModel from '../../services/user/model/service-model';
import {
    FetchUserDetailsRequest,
    FetchUserProfilePictureRequest,
    UpdateProfilePictureRequest,
    UpdateUserPasswordRequest,
    UpdateUserProfileRequest,
} from '../../services/user/model/request-model';
import {
    fetchUserProfilePicture,
    setUserDetails,
    setUserPasswordUpdateDetails,
    setUserProfilePicture,
    setUserProfilePictureId,
} from '../../store/user/user-action-creators';
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

const updateUserProfilePictureIdEpic: Epic<RootAction, RootAction, RootState, Services> = (
    action$: ActionsObservable<RootAction>,
    state$: StateObservable<RootState>,
    { userService }
) =>
    action$.pipe(
        filter(isOfType(UPDATE_USER_PROFILE_PICTURE)),
        concatMap((action) => {
            return concat(callUserServiceForUpdateProfilePicture(userService, action, state$.value.auth.token)).pipe(
                mergeMap((response) => {
                    const fileId: string = response.data.fileId;
                    return concat(of(setUserProfilePictureId(fileId)));
                }),
                catchError((errorResponse) => {
                    return concat(of(startServiceCall()));
                })
            );
        })
    );

function callUserServiceForUpdateProfilePicture(
    userService: UserServiceModel,
    action: UpdateUserProfilePictureAction,
    token: string
): Observable<UpdateProfilePictureResponse> {
    const updateProfilePictureRequest: UpdateProfilePictureRequest = {
        token: token,
        profile: action.payload.newProfilePicture,
    };
    return userService.updateProfilePicture(updateProfilePictureRequest);
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

const updateUserPasswordEpic: Epic<RootAction, RootAction, RootState, Services> = (
    action$: ActionsObservable<RootAction>,
    state$: StateObservable<RootState>,
    { userService }
) =>
    action$.pipe(
        filter(isOfType(UPDATE_USER_PASSWORD)),
        concatMap((action) => {
            return concat(callUserServiceForUpdatePassword(userService, action, state$.value.auth.token)).pipe(
                mergeMap((response) => {
                    if (response.data.passwordUpdated) {
                        return concat(of(setUserPasswordUpdateDetails('COMPLETED')));
                    } else {
                        return concat(of(setUserPasswordUpdateDetails('FAILED', 'Password update failed!!')));
                    }
                }),
                catchError((errorResponse) => {
                    return concat(of(startServiceCall()));
                })
            );
        })
    );

function callUserServiceForUpdatePassword(
    userService: UserServiceModel,
    action: UpdateUserPasswordAction,
    token: string
): Observable<UpdateUserPasswordResponse> {
    const updateUserPasswordRequest: UpdateUserPasswordRequest = {
        token: token,
        existingPassword: action.payload.existingPassword,
        newPassword: action.payload.newPassword,
    };
    return userService.updateUserPassword(updateUserPasswordRequest);
}

const USER_EPICS = [
    fetchUserDetailsEpic,
    fetchUserProfilePictureEpic,
    updateUserPasswordEpic,
    updateUserProfilePictureIdEpic,
];
export default USER_EPICS;
