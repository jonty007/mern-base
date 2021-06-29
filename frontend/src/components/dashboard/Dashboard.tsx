import React from 'react';
import Container from 'react-bootstrap/Container';
import { SignUpUserPayload } from 'src/store/auth/auth-action-payloads';

export interface DashboardDispatchProps {
    updateUser: (payload: SignUpUserPayload) => void;
}

export interface DashboardStateProps {
    firstName: string;
    lastName?: string;
    email?: string;
    dob?: string;
}

type Props = DashboardDispatchProps & DashboardStateProps;

export default class Dashboard extends React.Component<Props> {
    public render() {
        return (
            <>
                <Container>
                    <div>First Name: {this.props.firstName}</div>
                    <div>First Name</div>
                    <div>First Name</div>
                </Container>
            </>
        );
    }
}
