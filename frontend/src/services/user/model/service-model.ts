import { Observable } from 'rxjs';
import { FetchUserDetailsRequest, FetchUserProfileRequest } from 'src/services/user/model/request-model';
import { FetchUserDetailsResponse, FetchUserProfileResponse } from 'src/services/user/model/response-model';

export default interface UserServiceModel {
    fetchUserDetails: (request: FetchUserDetailsRequest) => Observable<FetchUserDetailsResponse>;
    fetchUserProfile: (request: FetchUserProfileRequest) => Observable<FetchUserProfileResponse>;
}
