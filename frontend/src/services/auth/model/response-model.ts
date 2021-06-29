export interface AuthorizeUserResponse {
    type: string;
    actionPayload: string;
}

export interface SignInUserResponsePayload {
    userId: string;
    token: string;
}

export interface SignUpUserResponse {
    data: AuthUserResponsePayload;
}

export interface SignInUserResponse {
    data: AuthUserResponsePayload;
}

export interface AuthUserResponsePayload {
    token: string;
    user: UserInfoPayload;
}

export interface UserInfoPayload {
    id: string;
}
