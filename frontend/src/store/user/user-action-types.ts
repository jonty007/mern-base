import {
    FETCH_USER_DETAILS,
    FETCH_USER_PROFILE_PICTURE,
    SET_USER_DETAILS,
    SET_USER_PROFILE_PICTURE,
} from 'src/store/user/user-action-names';
import {
    FetchUserDetailsPayload,
    FetchUserProfilePicturePayload,
    SetUserDetailsPayload,
    SetUserProfilePicturePayload,
} from 'src/store/user/user-action-payloads';

export interface FetchUserDetailsAction {
    type: typeof FETCH_USER_DETAILS;
    payload: FetchUserDetailsPayload;
}

export interface FetchUserProfilePictureAction {
    type: typeof FETCH_USER_PROFILE_PICTURE;
    payload: FetchUserProfilePicturePayload;
}

export interface SetUserDetailsAction {
    type: typeof SET_USER_DETAILS;
    payload: SetUserDetailsPayload;
}

export interface SetUserProfilePictureAction {
    type: typeof SET_USER_PROFILE_PICTURE;
    payload: SetUserProfilePicturePayload;
}

export type UserActionTypes =
    | FetchUserDetailsAction
    | FetchUserProfilePictureAction
    | SetUserDetailsAction
    | SetUserProfilePictureAction;
