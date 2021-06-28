import { Observable, of } from 'rxjs';
import { AuthorizeUserRequest } from 'src/services/auth/model/request-model';
import { AuthorizeUserResponse } from 'src/services/auth/model/response-model';
import PAVAuthServiceModel from 'src/services/auth/model/service-model';

const AUTH_SERVICE: PAVAuthServiceModel = {
    authorizeUser: (request: AuthorizeUserRequest): Observable<AuthorizeUserResponse> => {
        console.log(request);
        const authorizeUserResponse: AuthorizeUserResponse = {
            type: 'someType',
            actionPayload: JSON.stringify({
                userId: 'userId',
                token: 'token',
            }),
        };
        return of(authorizeUserResponse);
    },
};

export default AUTH_SERVICE;
