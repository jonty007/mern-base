import { connect } from 'react-redux';

import SignIn, { SignInDispatchProps, SignInStateProps } from './SignIn';
import RootState from 'src/store/state';
import { signInUser } from '../../../store/auth/auth-action-creators';
import { setNextStep } from '../../../store/navigation/navigation-action-creators';

function mapStateToProps(state: RootState): SignInStateProps {
    return {
        isLoading: false,
    };
}

const mapDispatchToProps = {
    signInUser: signInUser,
    setNextStep: setNextStep,
};

export default connect<SignInStateProps, SignInDispatchProps, Record<string, never>, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
