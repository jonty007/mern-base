export interface FetchUserDetailsResponse {
    data: UserDetailsData;
}

export interface UserDetailsData {
    userDetails: UserDetails;
}

export interface UserDetails {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    profileImageId: string;
}

export interface FetchUserProfilePictureResponse {
    data: ImageDetails;
}

export interface ImageDetails {
    imageDetails: ImageDetailsData;
}

export interface ImageDetailsData {
    base64: string;
}

export interface UpdateProfilePictureResponse {
    data: UpdateProfilePictureData;
}

export interface UpdateProfilePictureData {
    fileId: string;
}

export interface UpdateUserProfileResponse {
    data: UserDetailsData;
}

export interface UpdateUserPasswordResponse {
    data: UpdateUserPasswordData;
}

export interface UpdateUserPasswordData {
    passwordUpdated: boolean;
}
