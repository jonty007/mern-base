import { connect } from 'react-redux';

import Dashboard, { DashboardDispatchProps, DashboardStateProps } from './Dashboard';
import RootState from '../../store/state';
import { signUpUser } from '../../store/auth/auth-action-creators';

function mapStateToProps(state: RootState): DashboardStateProps {
    return {
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        email: state.user.email,
        dob: state.user.dob,
        phone: state.user.phone,
        profile: state.user.profile,
    };
}

const mapDispatchToProps = {
    updateUser: signUpUser,
};

export default connect<DashboardStateProps, DashboardDispatchProps, Record<string, never>, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
