import { connect } from 'react-redux';

import SignUp, { SignUpDispatchProps, SignUpStateProps } from './SignUp';
import RootState from 'src/store/state';
import { signUpUser } from '../../../store/auth/auth-action-creators';

function mapStateToProps(state: RootState): SignUpStateProps {
    return {
        isLoading: false,
    };
}

const mapDispatchToProps = {
    signUpUser: signUpUser,
};

export default connect<SignUpStateProps, SignUpDispatchProps, Record<string, never>, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);
