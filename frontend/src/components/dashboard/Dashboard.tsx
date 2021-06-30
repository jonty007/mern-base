import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { ActionSteps } from '../../routing/constants/steps';
import './Dashboard.css';
import UserPassword from '../../components/user/UserPasswordContainer';

export interface DashboardDispatchProps {
    setNextStep: (step: string) => void;
}

export interface DashboardStateProps {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    phone: string;
    profile: string;
    profileId: string;
}

type Props = DashboardDispatchProps & DashboardStateProps;

export default class Dashboard extends React.Component<Props> {
    public render() {
        return (
            <Container fluid className="text-center">
                <div className="width-50 container-div">
                    <Jumbotron fluid className="text-center">
                        <Image src={this.props.profile} roundedCircle className="image-size" />
                        <h2 className="text-center mt-3">
                            <span>{this.props.firstName}</span>
                            <span className="ml-2">{this.props.lastName}</span>
                        </h2>
                    </Jumbotron>
                    <Row className="mt-2 ml-3">
                        <Card className="ml-2 custom-card">
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">DOB</Card.Subtitle>
                                <Card.Title>{this.props.dob}</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="ml-2 custom-card">
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">Email</Card.Subtitle>
                                <Card.Title>{this.props.email}</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className="ml-2 custom-card">
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">Phone Number</Card.Subtitle>
                                <Card.Title>{this.props.phone}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Row>
                    <Row className="mt-2 ml-3 text-center">
                        <Button type="primary" onClick={() => this.props.setNextStep(ActionSteps.EDIT_USER_PROFILE)}>
                            Edit Profile
                        </Button>
                    </Row>
                    <Row className="mt-2 ml-3 text-center">
                        <UserPassword />
                    </Row>
                </div>
            </Container>
        );
    }
}
