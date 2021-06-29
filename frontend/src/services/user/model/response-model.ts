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
}

export interface FetchUserProfileResponse {
    profile: File;
}
