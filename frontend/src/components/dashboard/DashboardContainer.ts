import { connect } from 'react-redux';

import Dashboard, { DashboardDispatchProps, DashboardStateProps } from './Dashboard';
import RootState from '../../store/state';
import { signUpUser } from '../../store/auth/auth-action-creators';

function mapStateToProps(state: RootState): DashboardStateProps {
    return {
        firstName: 'false',
    };
}

const mapDispatchToProps = {
    updateUser: signUpUser,
};

export default connect<DashboardStateProps, DashboardDispatchProps, Record<string, never>, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
