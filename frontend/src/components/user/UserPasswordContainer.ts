import { connect } from 'react-redux';

import UserPassword, { UserPasswordDispatchProps, UserPasswordStateProps } from './UserPassword';
import RootState from '../../store/state';
import { setUserPasswordUpdateDetails, updateUserPassword } from '../../store/user/user-action-creators';

function mapStateToProps(state: RootState): UserPasswordStateProps {
    return {
        userPasswordUpdateStatus: state.user.userPasswordUpdateStatus,
    };
}

const mapDispatchToProps = {
    updateUserPassword: updateUserPassword,
    setUserPasswordUpdateDetails: setUserPasswordUpdateDetails,
};

export default connect<UserPasswordStateProps, UserPasswordDispatchProps, Record<string, never>, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(UserPassword);
