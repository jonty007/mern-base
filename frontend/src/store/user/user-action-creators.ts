import { UserDetails } from '../../services/user/model/response-model';
import {
    FETCH_USER_DETAILS,
    FETCH_USER_PROFILE_PICTURE,
    SET_USER_DETAILS,
    SET_USER_PROFILE_PICTURE,
} from '../../store/user/user-action-names';
import {
    FetchUserDetailsAction,
    FetchUserProfilePictureAction,
    SetUserDetailsAction,
    SetUserProfilePictureAction,
} from '../../store/user/user-action-types';

export function fetchUserDetails(token: string): FetchUserDetailsAction {
    console.log('action creator called');
    return {
        type: FETCH_USER_DETAILS,
        payload: {
            token: token,
        },
    };
}

export function fetchUserProfilePicture(token: string): FetchUserProfilePictureAction {
    console.log('action creator called');
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

export function setUserProfilePicture(profilePicture: File): SetUserProfilePictureAction {
    return {
        type: SET_USER_PROFILE_PICTURE,
        payload: {
            profilePicture: profilePicture,
        },
    };
}
