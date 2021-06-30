import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UpdateUserProfilePayload } from '../../store/user/user-action-payloads';
import { ActionSteps } from '../../routing/constants/steps';

export interface UserProfileEditDispatchProps {
    updateUser: (payload: UpdateUserProfilePayload) => void;
    setNextStep: (step: string) => void;
}

export interface UserProfileEditStateProps {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    phone: string;
    profile: string;
    profileId: string;
}

type Props = UserProfileEditDispatchProps & UserProfileEditStateProps;

interface State {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    profile: File;
    profileId: string;
}

export default class UserProfileEdit extends React.Component<Props> {
    public readonly state: State;

    public constructor(props: Props) {
        super(props);
        this.state = {
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
        const payload: UpdateUserProfilePayload = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            dob: this.state.dob,
            profile: this.state.profile,
            profileId: this.state.profileId,
        };
        this.props.updateUser(payload);
    }

    public render() {
        return (
            <Container>
                <Form className="mt-3 ml-3 mr-3">
                    <h3>Update Profile</h3>

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
                                <Form.Control.Feedback type="invalid">Please enter First Name</Form.Control.Feedback>
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
                        <Form.Text className="text-muted">We'll never share your contact with anyone else.</Form.Text>
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
                        <Form.Control.Feedback type="invalid">Please select Date of Birth</Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">Please select Date of Birth</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={this.submit}>
                        Update Profile
                    </Button>
                    <Button
                        variant="secondary"
                        type="submit"
                        onClick={() => this.props.setNextStep(ActionSteps.SET_MAIN_DASHBOARD)}
                    >
                        Back
                    </Button>
                </Form>
            </Container>
        );
    }
}
