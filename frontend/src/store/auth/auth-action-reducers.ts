import produce from 'immer';
import AuthState from './auth-state';
import { INITIAL_AUTH_STATE } from '../initial-state';
import { AuthActionTypes } from 'src/store/auth/auth-action-types';

export default function authReducer(state = INITIAL_AUTH_STATE, action: AuthActionTypes): AuthState {
    switch (action.type) {
        default:
            return state;
    }
}
