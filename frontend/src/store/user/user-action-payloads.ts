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
    profilePicture: string;
}

export interface UpdateUserProfilePayload {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    profile: File;
    profileId: string;
}

export interface UpdateUserPasswordPayload {
    existingPassword: string;
    newPassword: string;
}

export interface SetUserPasswordUpdateDetailsPayload {
    status: string;
    errorMessage?: string;
}
