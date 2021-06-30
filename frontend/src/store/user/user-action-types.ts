import {
    FETCH_USER_DETAILS,
    FETCH_USER_PROFILE_PICTURE,
    SET_USER_DETAILS,
    SET_USER_PASSWORD_UPDATE_DETAILS,
    SET_USER_PROFILE_PICTURE,
    SET_USER_PROFILE_PICTURE_ID,
    UPDATE_USER_PASSWORD,
    UPDATE_USER_PROFILE,
    UPDATE_USER_PROFILE_PICTURE,
} from 'src/store/user/user-action-names';
import {
    FetchUserDetailsPayload,
    FetchUserProfilePicturePayload,
    SetUserDetailsPayload,
    SetUserPasswordUpdateDetailsPayload,
    SetUserProfilePictureIdPayload,
    SetUserProfilePicturePayload,
    UpdateUserPasswordPayload,
    UpdateUserProfilePayload,
    UpdateUserProfilePicturePayload,
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

export interface UpdateUserProfileAction {
    type: typeof UPDATE_USER_PROFILE;
    payload: UpdateUserProfilePayload;
}

export interface UpdateUserPasswordAction {
    type: typeof UPDATE_USER_PASSWORD;
    payload: UpdateUserPasswordPayload;
}

export interface SetUserPasswordUpdateDetailsAction {
    type: typeof SET_USER_PASSWORD_UPDATE_DETAILS;
    payload: SetUserPasswordUpdateDetailsPayload;
}

export interface UpdateUserProfilePictureAction {
    type: typeof UPDATE_USER_PROFILE_PICTURE;
    payload: UpdateUserProfilePicturePayload;
}

export interface SetUserProfilePictureIdAction {
    type: typeof SET_USER_PROFILE_PICTURE_ID;
    payload: SetUserProfilePictureIdPayload;
}

export type UserActionTypes =
    | FetchUserDetailsAction
    | FetchUserProfilePictureAction
    | SetUserDetailsAction
    | SetUserProfilePictureAction
    | UpdateUserProfileAction
    | UpdateUserPasswordAction
    | SetUserPasswordUpdateDetailsAction
    | UpdateUserProfilePictureAction
    | SetUserProfilePictureIdAction;
