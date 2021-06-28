export interface AuthorizeUserResponse {
    type: string;
    actionPayload: string;
}

export interface SignInUserResponsePayload {
    userId: string;
    token: string;
}
