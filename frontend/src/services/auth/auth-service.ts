import { Observable, of } from 'rxjs';
import { AuthorizeUserRequest, SignInUserRequest, SignUpUserRequest } from 'src/services/auth/model/request-model';
import { AuthorizeUserResponse, SignInUserResponse, SignUpUserResponse } from 'src/services/auth/model/response-model';
import PAVAuthServiceModel from 'src/services/auth/model/service-model';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const AUTH_SERVICE: PAVAuthServiceModel = {
    authorizeUser: (request: AuthorizeUserRequest): Observable<AuthorizeUserResponse> => {
        const authorizeUserResponse: AuthorizeUserResponse = {
            type: 'someType',
            actionPayload: JSON.stringify({
                userId: 'userId',
                token: 'token',
            }),
        };
        return of(authorizeUserResponse);
    },

    signInUser: (request: SignInUserRequest): Observable<SignInUserResponse> => {
        return ajax({
            url: 'http://localhost:4001/api/v1/auth/login',
            method: 'POST',
            body: request,
        }).pipe(map((response) => response.response as SignInUserResponse));
    },

    signUpUser: (request: SignUpUserRequest): Observable<SignUpUserResponse> => {
        const formdata: FormData = new FormData();
        formdata.append('email', request.email);
        formdata.append('firstName', request.firstName);
        formdata.append('lastName', request.lastName);
        formdata.append('dob', request.dob);
        formdata.append('password', 'qwerty12345');
        formdata.append('phone', request.phoneNumber);
        formdata.append('profile', request.profile);

        return ajax({
            url: 'http://localhost:4001/api/v1/auth/sign-up',
            method: 'POST',
            body: formdata,
        }).pipe(map((response) => response.response as SignUpUserResponse));
    },
};

export default AUTH_SERVICE;
