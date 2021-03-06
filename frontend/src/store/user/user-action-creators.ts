import { UpdateUserPasswordPayload, UpdateUserProfilePayload } from 'src/store/user/user-action-payloads';
import { UserDetails } from '../../services/user/model/response-model';
import {
    FETCH_USER_DETAILS,
    FETCH_USER_PROFILE_PICTURE,
    SET_USER_DETAILS,
    SET_USER_PASSWORD_UPDATE_DETAILS,
    SET_USER_PROFILE_PICTURE,
    UPDATE_USER_PASSWORD,
    UPDATE_USER_PROFILE,
} from '../../store/user/user-action-names';
import {
    FetchUserDetailsAction,
    FetchUserProfilePictureAction,
    SetUserDetailsAction,
    SetUserPasswordUpdateDetailsAction,
    SetUserProfilePictureAction,
    UpdateUserPasswordAction,
    UpdateUserProfileAction,
} from '../../store/user/user-action-types';

export function fetchUserDetails(token: string): FetchUserDetailsAction {
    return {
        type: FETCH_USER_DETAILS,
        payload: {
            token: token,
        },
    };
}

export function fetchUserProfilePicture(token: string): FetchUserProfilePictureAction {
    return {
        type: FETCH_USER_PROFILE_PICTURE,
        payload: {
            token: token,
        },
    };
}

export function setUserDetails(userDetails: UserDetails): SetUserDetailsAction {
    return {
        type: SET_USER_DETAILS,
        payload: {
            userDetails: userDetails,
        },
    };
}

export function setUserProfilePicture(profilePicture: string): SetUserProfilePictureAction {
    return {
        type: SET_USER_PROFILE_PICTURE,
        payload: {
            profilePicture: profilePicture,
        },
    };
}

export function updateUserProfile(updateUserProfilePayload: UpdateUserProfilePayload): UpdateUserProfileAction {
    return {
        type: UPDATE_USER_PROFILE,
        payload: updateUserProfilePayload,
    };
}

export function updateUserPassword(updateUserPasswordPayload: UpdateUserPasswordPayload): UpdateUserPasswordAction {
    return {
        type: UPDATE_USER_PASSWORD,
        payload: updateUserPasswordPayload,
    };
}

export function setUserPasswordUpdateDetails(
    status: string,
    errorMessage?: string
): SetUserPasswordUpdateDetailsAction {
    return {
        type: SET_USER_PASSWORD_UPDATE_DETAILS,
        payload: {
            status: status,
            errorMessage: errorMessage,
        },
    };
}
