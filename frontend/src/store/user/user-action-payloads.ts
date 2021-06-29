import { UserDetails } from 'src/services/user/model/response-model';

export interface FetchUserDetailsPayload {
    token: string;
}

export interface FetchUserProfilePicturePayload {
    token: string;
}

export interface SetUserDetailsPayload {
    userDetails: UserDetails;
}

export interface SetUserProfilePicturePayload {
    profilePicture: File;
}
