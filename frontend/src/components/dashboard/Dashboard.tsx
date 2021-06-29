import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UpdateUserProfilePayload } from 'src/store/user/user-action-payloads';

export interface DashboardDispatchProps {
    updateUser: (payload: UpdateUserProfilePayload) => void;
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

interface State {
    isEditMode: boolean;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    profile: File;
    profileId: string;
}

export default class Dashboard extends React.Component<Props> {
    public readonly state: State;

    public constructor(props: Props) {
        super(props);
        this.state = {
            isEditMode: false,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            phoneNumber: this.props.phone,
            dob: this.props.dob,
            profile: undefined as any,
            profileId: this.props.profileId,
        };

        this.submitEdit = this.submitEdit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    private submitEdit(event: any) {
        event.preventDefault();
        this.setState({
            isEditMode: true,
        });
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (target.files && target.files[0]) {
            this.setState({
                [name]: target.files[0],
            });
        } else {
            this.setState({
                [name]: value,
            });
        }
    }

    private submit(event: any) {
        event.preventDefault();
        //TODO: do validations
        console.log('submit', this.state);
        const payload: UpdateUserProfilePayload = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            dob: this.state.dob,
            profile: this.state.profile,
            profileId: this.state.profileId,
        };
        console.log(payload);
        this.props.updateUser(payload);
    }

    public render() {
        return (
            <>
                {this.state.isEditMode ? (
                    <Container>
                        <Form className="mt-3 ml-3 mr-3">
                            <h3>Sign Up</h3>

                            <Form.Row>
                                <Col>
                                    <Form.Group controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={this.state.firstName}
                                            placeholder="Enter First Name"
                                            onChange={this.handleInputChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter First Name
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={this.state.lastName}
                                            onChange={this.handleInputChange}
                                            placeholder="Enter Last Name"
                                        />
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Form.Group controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="phone"
                                    name="phoneNumber"
                                    value={this.state.phoneNumber}
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Phone Number"
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your contact with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="forDOB">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dob"
                                    value={this.state.dob}
                                    onChange={this.handleInputChange}
                                    placeholder="Date of Birth"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please select Date of Birth
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="forImage">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="profile"
                                    onChange={this.handleInputChange}
                                    placeholder="Upload Image"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please select Date of Birth
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={this.submit}>
                                Update Profile
                            </Button>
                        </Form>
                    </Container>
                ) : (
                    <Container>
                        <Col lg={3} />
                        <Col lg={6}>
                            <Row>
                                <img src={this.props.profile} />
                            </Row>
                            <Row>
                                <hr />
                            </Row>
                            <Row className="mt-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">First Name</Card.Subtitle>
                                        <Card.Title>{this.props.firstName}</Card.Title>
                                    </Card.Body>
                                </Card>
                                <Card className="ml-2">
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">Last Name</Card.Subtitle>
                                        <Card.Title>{this.props.lastName}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row className="mt-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">DOB</Card.Subtitle>
                                        <Card.Title>{this.props.dob}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row className="mt-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">Email</Card.Subtitle>
                                        <Card.Title>{this.props.email}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row className="mt-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">Phone Number</Card.Subtitle>
                                        <Card.Title>{this.props.phone}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <Row className="mt-2">
                                <Button type="primary" onClick={this.submitEdit}>
                                    Edit Profile
                                </Button>
                            </Row>
                        </Col>
                    </Container>
                )}
            </>
        );
    }
}
