import { connect } from 'react-redux';

import UserProfilePicture, {
    UserProfilePictureDispatchProps,
    UserProfilePictureStateProps,
} from './UserProfilePicture';
import RootState from '../../store/state';
import { setUserPasswordUpdateDetails, updateUserProfilePicture } from '../../store/user/user-action-creators';

function mapStateToProps(state: RootState): UserProfilePictureStateProps {
    return {
        profilePictureBase64: state.user.profilePictureBase64,
        userProfilePictureUpdateStatus: state.user.userPasswordUpdateStatus, //TODO: change this
    };
}

const mapDispatchToProps = {
    updateUserProfilePicture: updateUserProfilePicture,
    updateUserProfilePictureStatus: setUserPasswordUpdateDetails,
};

export default connect<UserProfilePictureStateProps, UserProfilePictureDispatchProps, Record<string, never>, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(UserProfilePicture);
