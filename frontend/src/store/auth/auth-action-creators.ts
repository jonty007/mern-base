import { SignUpUserPayload } from 'src/store/auth/auth-action-payloads';
import { SET_USER_AUTH, SIGN_IN_USER, SIGN_UP_USER, START_SERVICE_CALL } from '../../store/auth/auth-action-names';
import {
    SetUserAuthAction,
    SignInUserAction,
    SignUpUserAction,
    StartServiceCallAction,
} from '../../store/auth/auth-action-types';

export function signInUser(email: string, password: string): SignInUserAction {
    return {
        type: SIGN_IN_USER,
        payload: {
            userId: email,
            password: password,
        },
    };
}

export function startServiceCall(): StartServiceCallAction {
    return {
        type: START_SERVICE_CALL,
        payload: {},
    };
}

export function signUpUser(signUpUserPayload: SignUpUserPayload): SignUpUserAction {
    return {
        type: SIGN_UP_USER,
        payload: signUpUserPayload,
    };
}

export function setUserAuth(userId: string, token: string): SetUserAuthAction {
    return {
        type: SET_USER_AUTH,
        payload: {
            userId: userId,
            token: token,
        },
    };
}
