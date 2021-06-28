import { AuthorizeUserRequest } from 'src/services/auth/model/request-model';
import { AuthorizeUserResponse } from 'src/services/auth/model/response-model';
import { Observable } from 'rxjs';

export default interface AuthServiceModel {
    authorizeUser: (request: AuthorizeUserRequest) => Observable<AuthorizeUserResponse>;
}
