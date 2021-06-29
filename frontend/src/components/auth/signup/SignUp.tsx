import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { SignUpUserPayload } from 'src/store/auth/auth-action-payloads';

export interface SignUpDispatchProps {
    signUpUser: (payload: SignUpUserPayload) => void;
}

export interface SignUpStateProps {
    isLoading: boolean;
}

type Props = SignUpDispatchProps & SignUpStateProps;

interface State {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dob: string;
    profile: File;
}

export default class SignUp extends React.Component<Props> {
    public readonly state: State = this.getInitialState();

    private getInitialState(): State {
        return {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            dob: '',
            profile: null as any,
        };
    }

    public constructor(props: Props) {
        super(props);

        this.submit = this.submit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
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
        const payload: SignUpUserPayload = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            dob: this.state.dob,
            profile: this.state.profile,
        };
        this.props.signUpUser(payload);
    }

    public render() {
        return (
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
                                    onChange={this.handleInputChange}
                                    placeholder="Enter Last Name"
                                />
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            onChange={this.handleInputChange}
                            placeholder="Enter email"
                            required
                        />
                        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        <Form.Control.Feedback type="invalid">Please enter Email</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="phone"
                            name="phoneNumber"
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
                            onChange={this.handleInputChange}
                            placeholder="Date of Birth"
                            required
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
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }
}
