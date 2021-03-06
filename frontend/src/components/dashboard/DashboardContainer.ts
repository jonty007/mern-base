import { connect } from 'react-redux';

import Dashboard, { DashboardDispatchProps, DashboardStateProps } from './Dashboard';
import RootState from '../../store/state';
import { setNextStep } from '../../store/navigation/navigation-action-creators';

function mapStateToProps(state: RootState): DashboardStateProps {
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
    setNextStep: setNextStep,
};

export default connect<DashboardStateProps, DashboardDispatchProps, Record<string, never>, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
