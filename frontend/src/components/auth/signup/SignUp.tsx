import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

export interface SignUpDispatchProps {
    signUpUser: () => void;
}

export interface SignUpStateProps {
    isLoading: boolean;
}

type Props = SignUpDispatchProps & SignUpStateProps;

export default class SignUp extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);

        this.submit = this.submit.bind(this);
    }

    private submit(event: any) {
        event.preventDefault();
        //TODO: do validations
        this.props.signUpUser();
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
                                <Form.Control type="text" placeholder="Enter First Name" required />
                                <Form.Control.Feedback type="invalid">Please enter First Name</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Last Name" />
                            </Form.Group>
                        </Col>
                    </Form.Row>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required />
                        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        <Form.Control.Feedback type="invalid">Please enter Email</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="phone" placeholder="Enter Phone Number" />
                        <Form.Text className="text-muted">We'll never share your contact with anyone else.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="forDOB">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" placeholder="Date of Birth" required />
                        <Form.Control.Feedback type="invalid">Please select Date of Birth</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="forImage">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file" placeholder="Upload Image" required />
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
