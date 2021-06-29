import { AuthorizeUserRequest, SignInUserRequest, SignUpUserRequest } from 'src/services/auth/model/request-model';
import { AuthorizeUserResponse, SignInUserResponse, SignUpUserResponse } from 'src/services/auth/model/response-model';
import { Observable } from 'rxjs';

export default interface AuthServiceModel {
    authorizeUser: (request: AuthorizeUserRequest) => Observable<AuthorizeUserResponse>;
    signUpUser: (request: SignUpUserRequest) => Observable<SignUpUserResponse>;
    signInUser: (request: SignInUserRequest) => Observable<SignInUserResponse>;
}
