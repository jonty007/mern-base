import produce from 'immer';
import { INITIAL_USER_STATE } from '../initial-state';
import {
    SET_USER_DETAILS,
    SET_USER_PASSWORD_UPDATE_DETAILS,
    SET_USER_PROFILE_PICTURE,
    UPDATE_USER_PASSWORD,
} from '../../store/user/user-action-names';
import UserState from './user-state';
import {
    SetUserDetailsPayload,
    SetUserPasswordUpdateDetailsPayload,
    SetUserProfilePicturePayload,
} from '../../store/user/user-action-payloads';
import { UserActionTypes } from '../../store/user/user-action-types';

const setUserDetails = produce((draftState: UserState, payload: SetUserDetailsPayload) => {
    draftState.dob = payload.userDetails.dob;
    draftState.email = payload.userDetails.email;
    draftState.firstName = payload.userDetails.firstName;
    draftState.lastName = payload.userDetails.lastName;
    draftState.phone = payload.userDetails.phone;
    draftState.profilePictureId = payload.userDetails.profileImageId;
});

const setUserProfilePicture = produce((draftState: UserState, payload: SetUserProfilePicturePayload) => {
    draftState.profilePictureBase64 = payload.profilePicture;
});

const setUpdateUserPasswordStatus = produce((draftState: UserState) => {
    draftState.userPasswordUpdateStatus = 'STARTED';
});

const setUserPasswordUpdateDetails = produce((draftState: UserState, payload: SetUserPasswordUpdateDetailsPayload) => {
    draftState.userPasswordUpdateStatus = payload.status;
});

export default function userReducer(state = INITIAL_USER_STATE, action: UserActionTypes): UserState {
    switch (action.type) {
        case SET_USER_DETAILS:
            return setUserDetails(state, action.payload);
        case SET_USER_PROFILE_PICTURE:
            return setUserProfilePicture(state, action.payload);
        case UPDATE_USER_PASSWORD:
            return setUpdateUserPasswordStatus(state);
        case SET_USER_PASSWORD_UPDATE_DETAILS:
            return setUserPasswordUpdateDetails(state, action.payload);
        default:
            return state;
    }
}
