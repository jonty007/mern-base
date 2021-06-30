import { Observable } from 'rxjs';
import {
    FetchUserDetailsRequest,
    FetchUserProfilePictureRequest,
    UpdateProfilePictureRequest,
    UpdateUserPasswordRequest,
    UpdateUserProfileRequest,
} from 'src/services/user/model/request-model';
import {
    FetchUserDetailsResponse,
    FetchUserProfilePictureResponse,
    UpdateProfilePictureResponse,
    UpdateUserPasswordResponse,
    UpdateUserProfileResponse,
} from 'src/services/user/model/response-model';

export default interface UserServiceModel {
    fetchUserDetails: (request: FetchUserDetailsRequest) => Observable<FetchUserDetailsResponse>;
    fetchUserProfilePicture: (request: FetchUserProfilePictureRequest) => Observable<FetchUserProfilePictureResponse>;
    updateProfilePicture: (request: UpdateProfilePictureRequest) => Observable<UpdateProfilePictureResponse>;
    updateUserProfile: (request: UpdateUserProfileRequest) => Observable<UpdateUserProfileResponse>;
    updateUserPassword: (request: UpdateUserPasswordRequest) => Observable<UpdateUserPasswordResponse>;
}
