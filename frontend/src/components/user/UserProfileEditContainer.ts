import { connect } from 'react-redux';

import UserProfileEdit, { UserProfileEditDispatchProps, UserProfileEditStateProps } from './UserProfileEdit';
import RootState from '../../store/state';
import { updateUserProfile } from '../../store/user/user-action-creators';
import { setNextStep } from '../../store/navigation/navigation-action-creators';

function mapStateToProps(state: RootState): UserProfileEditStateProps {
    return {
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        email: state.user.email,
        dob: state.user.dob,
        phone: state.user.phone,
        profile: state.user.profilePictureBase64,
        profileId: state.user.profilePictureId,
    };
}

const mapDispatchToProps = {
    updateUser: updateUserProfile,
    setNextStep: setNextStep,
};

export default connect<UserProfileEditStateProps, UserProfileEditDispatchProps, Record<string, never>, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileEdit);
