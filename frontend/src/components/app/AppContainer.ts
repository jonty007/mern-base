import { connect } from 'react-redux';

import App, { AppDispatchProps, AppStateProps } from './App';
import RootState from '../../store/state';
import { setNextStep } from '../../store/navigation/navigation-action-creators';

function mapStateToProps(state: RootState): AppStateProps {
    return {
        isLoading: false,
    };
}

const mapDispatchToProps = {
    init: setNextStep,
};

export default connect<AppStateProps, AppDispatchProps, Record<string, never>, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(App);
