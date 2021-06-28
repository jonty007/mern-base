import { SET_USER_AUTH, SIGN_IN_USER, SIGN_UP_USER, START_SERVICE_CALL } from 'src/store/auth/auth-action-names';
import { SetUserAuthPayload, SignInUserPayload, SignUpUserPayload } from 'src/store/auth/auth-action-payloads';

export interface SignInUserAction {
    type: typeof SIGN_IN_USER;
    payload: SignInUserPayload;
}

export interface StartServiceCallAction {
    type: typeof START_SERVICE_CALL;
    payload: {};
}

export interface SetUserAuthAction {
    type: typeof SET_USER_AUTH;
    payload: SetUserAuthPayload;
}

export interface SignUpUserAction {
    type: typeof SIGN_UP_USER;
    payload: SignUpUserPayload;
}

export type AuthActionTypes = SignInUserAction | StartServiceCallAction | SetUserAuthAction | SignUpUserAction;
