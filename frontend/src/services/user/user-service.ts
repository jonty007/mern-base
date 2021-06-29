import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import UserServiceModel from '../../services/user/model/service-model';
import { FetchUserDetailsRequest, FetchUserProfileRequest } from '../../services/user/model/request-model';
import { FetchUserDetailsResponse, FetchUserProfileResponse } from '../../services/user/model/response-model';

const USER_SERVICE: UserServiceModel = {
    fetchUserDetails: (request: FetchUserDetailsRequest): Observable<FetchUserDetailsResponse> => {
        console.log('sign in request final', request);
        return ajax({
            url: 'http://localhost:4001/api/v1/user/me',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + request.token,
            },
            body: request,
        }).pipe(map((response) => response.response as FetchUserDetailsResponse));
    },

    fetchUserProfile: (request: FetchUserProfileRequest): Observable<FetchUserProfileResponse> => {
        console.log('sign up request final', request);

        return ajax({
            url: 'https://localhost:4001/api/v1/user/profile-picture',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + request.token,
            },
            body: request,
        }).pipe(map((response) => response.response as FetchUserProfileResponse));
    },
};

export default USER_SERVICE;
