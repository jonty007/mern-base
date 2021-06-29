export interface SignInUserPayload {
    userId: string;
    password: string;
}

export interface SetUserAuthPayload {
    userId: string;
    token: string;
}

export interface SignUpUserPayload {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    profile: File;
}
