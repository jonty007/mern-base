import { Observable } from 'rxjs';
import {
    FetchUserDetailsRequest,
    FetchUserProfilePictureRequest,
    UpdateProfilePictureRequest,
    UpdateUserProfileRequest,
} from 'src/services/user/model/request-model';
import {
    FetchUserDetailsResponse,
    FetchUserProfilePictureResponse,
    UpdateProfilePictureResponse,
    UpdateUserProfileResponse,
} from 'src/services/user/model/response-model';

export default interface UserServiceModel {
    fetchUserDetails: (request: FetchUserDetailsRequest) => Observable<FetchUserDetailsResponse>;
    fetchUserProfilePicture: (request: FetchUserProfilePictureRequest) => Observable<FetchUserProfilePictureResponse>;
    updateProfilePicture: (request: UpdateProfilePictureRequest) => Observable<UpdateProfilePictureResponse>;
    updateUserProfile: (request: UpdateUserProfileRequest) => Observable<UpdateUserProfileResponse>;
}
