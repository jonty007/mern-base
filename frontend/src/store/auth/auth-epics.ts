import { Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { filter, concatMap, mergeMap, catchError } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import RootState from '../../store/state';
import { Services } from '../../store/services';
import { RootAction } from '../../store/action';

import { SIGN_IN_USER, SIGN_UP_USER } from './auth-action-names';
import { concat, Observable, of } from 'rxjs';
import AuthServiceModel from '../../services/auth/model/service-model';
import { AuthorizeUserRequest, SignUpUserRequest } from '../../services/auth/model/request-model';
import {
    AuthorizeUserResponse,
    SignInUserResponsePayload,
    SignUpUserResponse,
} from '../../services/auth/model/response-model';
import { setUserAuth, startServiceCall } from '../../store/auth/auth-action-creators';
import { SignInUserAction, SignUpUserAction } from '../../store/auth/auth-action-types';
import { SignUpUserPayload } from 'src/store/auth/auth-action-payloads';

const signInUserEpic: Epic<RootAction, RootAction, RootState, Services> = (
    action$: ActionsObservable<RootAction>,
    state$: StateObservable<RootState>,
    { authService }
) =>
    action$.pipe(
        filter(isOfType(SIGN_IN_USER)),
        concatMap((action) => {
            return concat(callAuthService(authService, action)).pipe(
                mergeMap((response) => {
                    const payload: SignInUserResponsePayload = JSON.parse(
                        response.actionPayload
                    ) as SignInUserResponsePayload;
                    localStorage.setItem('token', payload.token);
                    return concat(of(setUserAuth(payload.userId, payload.token)));
                }),
                catchError((errorResponse) => {
                    return concat(of(startServiceCall()));
                })
            );
        })
    );

function callAuthService(authService: AuthServiceModel, action: SignInUserAction): Observable<AuthorizeUserResponse> {
    const authorizeUserRequest: AuthorizeUserRequest = {
        type: 'USER_LOG_IN',
        payload: JSON.stringify({
            userName: action.payload.userId,
            password: action.payload.password,
        }),
    };
    return authService.authorizeUser(authorizeUserRequest);
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
                    console.log('success');
                    return concat(of(setUserAuth(userId, token)));
                    //TODO: call setNextStep(DASHBOARD)
                }),
                catchError((errorResponse) => {
                    localStorage.clear();
                    console.log(errorResponse);
                    return concat(of(startServiceCall()));
                })
            );
        })
    );

function callAuthSignUpService(
    authService: AuthServiceModel,
    action: SignUpUserAction
): Observable<SignUpUserResponse> {
    console.log('sign up called in epic');
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
