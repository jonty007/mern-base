export interface AuthorizeUserResponse {
    type: string;
    actionPayload: string;
}

export interface SignInUserResponsePayload {
    userId: string;
    token: string;
}

export interface SignUpUserResponse {
    data: SignUpUserResponsePayload;
}

export interface SignUpUserResponsePayload {
    token: string;
    user: UserInfoPayload;
}

export interface UserInfoPayload {
    id: string;
}
