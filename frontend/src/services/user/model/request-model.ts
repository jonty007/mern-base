export interface FetchUserDetailsRequest {
    token: string;
}

export interface FetchUserProfilePictureRequest {
    token: string;
}

export interface UpdateProfilePictureRequest {
    profile: File;
    token: string;
}

export interface UpdateUserProfileRequest {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    profileImageId: string;
}
