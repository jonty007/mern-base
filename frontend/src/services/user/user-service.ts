import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import UserServiceModel from '../../services/user/model/service-model';
import {
    FetchUserDetailsRequest,
    FetchUserProfilePictureRequest,
    UpdateProfilePictureRequest,
    UpdateUserProfileRequest,
} from '../../services/user/model/request-model';
import {
    FetchUserDetailsResponse,
    FetchUserProfilePictureResponse,
    UpdateProfilePictureResponse,
    UpdateUserProfileResponse,
} from '../../services/user/model/response-model';
import { request } from 'http';

const USER_SERVICE: UserServiceModel = {
    fetchUserDetails: (request: FetchUserDetailsRequest): Observable<FetchUserDetailsResponse> => {
        return ajax({
            url: 'http://localhost:4001/api/v1/user/me',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + request.token,
            },
            body: request,
        }).pipe(map((response) => response.response as FetchUserDetailsResponse));
    },

    fetchUserProfilePicture: (request: FetchUserProfilePictureRequest): Observable<FetchUserProfilePictureResponse> => {
        return ajax({
            url: 'http://localhost:4001/api/v1/user/profile-picture',
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + request.token,
            },
            body: request,
        }).pipe(map((response) => response.response as FetchUserProfilePictureResponse));
    },

    updateProfilePicture: (request: UpdateProfilePictureRequest): Observable<UpdateProfilePictureResponse> => {
        const formdata: FormData = new FormData();
        formdata.append('profile', request.profile);

        return ajax({
            url: 'http://localhost:4001/api/v1/file/profile-upload',
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + request.token,
            },
            body: formdata,
        }).pipe(map((response) => response.response as UpdateProfilePictureResponse));
    },

    updateUserProfile: (request: UpdateUserProfileRequest): Observable<UpdateUserProfileResponse> => {
        return ajax({
            url: 'http://localhost:4001/api/v1/user/me',
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + request.token,
            },
            body: request,
        }).pipe(map((response) => response.response as UpdateUserProfileResponse));
    },
};

export default USER_SERVICE;
