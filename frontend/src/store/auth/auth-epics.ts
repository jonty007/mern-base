import { Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { filter, concatMap, mergeMap, catchError } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import RootState from '../../store/state';
import { Services } from '../../store/services';
import { RootAction } from '../../store/action';

import { SIGN_IN_USER, SIGN_UP_USER } from './auth-action-names';
import { concat, Observable, of } from 'rxjs';
import AuthServiceModel from '../../services/auth/model/service-model';
import { SignInUserRequest, SignUpUserRequest } from '../../services/auth/model/request-model';
import { SignInUserResponse, SignUpUserResponse } from '../../services/auth/model/response-model';
import { setUserAuth, startServiceCall } from '../../store/auth/auth-action-creators';
import { SignInUserAction, SignUpUserAction } from '../../store/auth/auth-action-types';
import { SignUpUserPayload } from '../../store/auth/auth-action-payloads';
import { fetchUserDetails, fetchUserProfilePicture } from '../../store/user/user-action-creators';

const signInUserEpic: Epic<RootAction, RootAction, RootState, Services> = (
    action$: ActionsObservable<RootAction>,
    state$: StateObservable<RootState>,
    { authService }
) =>
    action$.pipe(
        filter(isOfType(SIGN_IN_USER)),
        concatMap((action) => {
            return concat(callAuthSignInService(authService, action)).pipe(
                mergeMap((response) => {
                    const token: string = response.data.token;
                    const userId: string = response.data.user.id;
                    localStorage.setItem('token', token);

                    return concat(
                        of(setUserAuth(userId, token)),
                        of(fetchUserDetails(token)),
                        of(fetchUserProfilePicture(token))
                    );
                }),
                catchError((errorResponse) => {
                    return concat(of(startServiceCall()));
                })
            );
        })
    );

function callAuthSignInService(
    authService: AuthServiceModel,
    action: SignInUserAction
): Observable<SignInUserResponse> {
    const signInUserRequest: SignInUserRequest = {
        email: action.payload.userId,
        password: action.payload.password,
    };
    return authService.signInUser(signInUserRequest);
}

const signUpUserEpic: Epic<RootAction, RootAction, RootState, Services> = (
    action$: ActionsObservable<RootAction>,
    state$: StateObservable<RootState>,
    { authService }
) =>
    action$.pipe(
        filter(isOfType(SIGN_UP_USER)),
        concatMap((action) => {
            return concat(callAuthSignUpService(authService, action)).pipe(
                mergeMap((response) => {
                    const userId: string = response.data.user.id;
                    const token: string = response.data.token;
                    localStorage.setItem('token', token);
                    return concat(of(setUserAuth(userId, token)));
                    //TODO: call setNextStep(DASHBOARD)
                }),
                catchError((errorResponse) => {
                    localStorage.clear();
                    return concat(of(startServiceCall()));
                })
            );
        })
    );

function callAuthSignUpService(
    authService: AuthServiceModel,
    action: SignUpUserAction
): Observable<SignUpUserResponse> {
    const payload: SignUpUserPayload = action.payload;
    const signUpUserRequest: SignUpUserRequest = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        dob: payload.dob,
        profile: payload.profile,
    };
    return authService.signUpUser(signUpUserRequest);
}

export default [signInUserEpic, signUpUserEpic];
