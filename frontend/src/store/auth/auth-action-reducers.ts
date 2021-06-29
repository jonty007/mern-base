import produce from 'immer';
import AuthState from './auth-state';
import { INITIAL_AUTH_STATE } from '../initial-state';
import { AuthActionTypes } from '../../store/auth/auth-action-types';
import { SET_USER_AUTH } from '../../store/auth/auth-action-names';
import { SetUserAuthPayload } from '../../store/auth/auth-action-payloads';

const setUserAuth = produce((draftState: AuthState, payload: SetUserAuthPayload) => {
    draftState.token = payload.token;
});

export default function authReducer(state = INITIAL_AUTH_STATE, action: AuthActionTypes): AuthState {
    switch (action.type) {
        case SET_USER_AUTH:
            return setUserAuth(state, action.payload);
        default:
            return state;
    }
}
