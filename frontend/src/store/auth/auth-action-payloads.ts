export interface SignInUserPayload {
    userId: string;
    password: string;
}

export interface SetUserAuthPayload {
    userId: string;
    token: string;
}

export interface SignUpUserPayload {
    email: string;
}
