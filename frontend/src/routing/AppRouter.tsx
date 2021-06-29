import React from 'react';
import * as Routes from '../routing/constants/routes';
import { Switch, Route } from 'react-router-dom';
import { Router } from 'react-router';
import history from './history';

import Login from '../components/auth/signin/SignInContainer';
import SignUp from '../components/auth/signup/SignUpContainer';
import Dashboard from '../components/dashboard/DashboardContainer';

export default class AppRouter extends React.Component {
    private Loading = () => {
        return <p>Loading...</p>;
    };

    public render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route path={Routes.LOGIN_PAGE} component={Login} />
                        <Route path={Routes.SIGN_UP_PAGE} component={SignUp} />
                        <Route path={Routes.LANDING_PAGE} component={Login} />
                        <Route path={Routes.MAIN_DASHBOARD} component={Dashboard} />
                        <Route path="/" exact component={this.Loading} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
