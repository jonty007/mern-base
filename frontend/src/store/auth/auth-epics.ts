import { Epic, ActionsObservable, StateObservable } from 'redux-observable';
import { filter, concatMap, mergeMap, catchError } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import RootState from '../../store/state';
import { Services } from '../../store/services';
import { RootAction } from '../../store/action';

import { SIGN_IN_USER, SIGN_UP_USER } from './auth-action-names';
import { concat, Observable, of } from 'rxjs';
import AuthServiceModel from '../../services/auth/model/service-model';
import { AuthorizeUserRequest } from '../../services/auth/model/request-model';
import { AuthorizeUserResponse, SignInUserResponsePayload } from '../../services/auth/model/response-model';
import { setUserAuth, startServiceCall } from '../../store/auth/auth-action-creators';
import { SignInUserAction, SignUpUserAction } from '../../store/auth/auth-action-types';

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
                    const payload: SignInUserResponsePayload = JSON.parse(
                        response.actionPayload
                    ) as SignInUserResponsePayload;
                    localStorage.setItem('token', payload.token);
                    return concat(of(setUserAuth(payload.userId, payload.token)));
                    //TODO: call setNextStep(DASHBOARD)
                }),
                catchError((errorResponse) => {
                    return concat(of(startServiceCall()));
                })
            );
        })
    );

function callAuthSignUpService(
    authService: AuthServiceModel,
    action: SignUpUserAction
): Observable<AuthorizeUserResponse> {
    console.log('sign up called in epic');
    const authorizeUserRequest: AuthorizeUserRequest = {
        type: 'USER_LOG_IN',
        payload: JSON.stringify({
            userName: action.payload.email,
            password: action.payload.email,
        }),
    };
    return authService.authorizeUser(authorizeUserRequest);
}

export default [signInUserEpic, signUpUserEpic];
