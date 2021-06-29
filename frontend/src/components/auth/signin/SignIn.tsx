import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { ActionSteps } from '../../../routing/constants/steps';

export interface SignInDispatchProps {
    signInUser: (email: string, password: string) => void;
    setNextStep: (step: string) => void;
}

export interface SignInStateProps {
    isLoading: boolean;
}

type Props = SignInDispatchProps & SignInStateProps;

interface State {
    email: string;
    password: string;
}

export default class SignIn extends React.Component<Props> {
    public readonly state: State = this.getInitialState();

    private getInitialState(): State {
        return {
            email: '',
            password: '',
        };
    }

    public constructor(props: Props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    private handleSubmit(event: any) {
        event.preventDefault();
        this.props.signInUser(this.state.email, this.state.password);
    }

    public render() {
        return (
            <Container>
                <Form className="mt-3 ml-3 mr-3">
                    <h3>Sign In</h3>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            onChange={this.handleInputChange}
                            placeholder="Enter email"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            onChange={this.handleInputChange}
                            placeholder="Password"
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                    <Button
                        variant="link"
                        className="ml-2"
                        onClick={() => this.props.setNextStep(ActionSteps.SET_SIGN_UP_PAGE)}
                        type="submit"
                    >
                        Not an Existing User? (SignUp)
                    </Button>
                </Form>
            </Container>
        );
    }
}
