export interface AuthorizeUserRequest {
    type: string;
    payload: string;
}

export interface SignUpUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    profile: File;
}
