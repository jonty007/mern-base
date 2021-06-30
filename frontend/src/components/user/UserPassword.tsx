import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import { UpdateUserPasswordPayload } from 'src/store/user/user-action-payloads';

export interface UserPasswordStateProps {
    userPasswordUpdateStatus: string;
}

export interface UserPasswordDispatchProps {
    updateUserPassword: (updateUserPasswordPayload: UpdateUserPasswordPayload) => void;
    setUserPasswordUpdateDetails: (status: string, errorMessage?: string) => void;
}

interface State {
    newPassword: string;
    newPasswordConfirm: string;
    existingPassword: string;
    isPasswordMatching: boolean;
}

type Props = UserPasswordStateProps & UserPasswordDispatchProps;

export default class UserPassword extends React.Component<Props> {
    public readonly state: State;

    public constructor(props: Props) {
        super(props);
        this.state = {
            newPassword: '',
            newPasswordConfirm: '',
            existingPassword: '',
            isPasswordMatching: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    private submit(event: any) {
        event.preventDefault();
        const updateUserPasswordPayload: UpdateUserPasswordPayload = {
            newPassword: this.state.newPassword,
            existingPassword: this.state.existingPassword,
        };
        this.props.updateUserPassword(updateUserPasswordPayload);
    }

    private handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === 'newPasswordConfirm') {
            const isPasswordMatching: boolean = this.state.newPassword === value;
            console.log('this is called');
            this.setState({
                [name]: value,
                isPasswordMatching: isPasswordMatching,
            });
        } else {
            this.setState({
                [name]: value,
            });
        }
    }

    public render() {
        const userUpdateStatusCompleted: boolean = this.props.userPasswordUpdateStatus === 'COMPLETED';

        return (
            <Jumbotron className="manage-password content-center" fluid>
                {this.props.userPasswordUpdateStatus === 'EDIT_MODE' ||
                this.props.userPasswordUpdateStatus === 'STARTED' ? (
                    <>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                placeholder="Enter New Password"
                                onChange={this.handleInputChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="forNewPasswordConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPasswordConfirm"
                                placeholder="Confirm New Password"
                                onChange={this.handleInputChange}
                                required
                                isInvalid={
                                    !this.state.isPasswordMatching && this.state.newPasswordConfirm ? true : false
                                }
                            />
                            <Form.Control.Feedback type="invalid">Passwords don't match!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="forExistingPassword">
                            <Form.Label>Existing Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="existingPassword"
                                placeholder="Enter Existing Password"
                                onChange={this.handleInputChange}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Existing Password is Incorrect</Form.Control.Feedback>
                        </Form.Group>

                        <Button type="primary" onClick={this.submit}>
                            Submit Password
                        </Button>
                        <Button
                            type="tertiary"
                            className="ml-2"
                            onClick={() => this.props.setUserPasswordUpdateDetails('')}
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button type="secondary" onClick={() => this.props.setUserPasswordUpdateDetails('EDIT_MODE')}>
                            Change Password
                        </Button>
                        {userUpdateStatusCompleted ? (
                            <Alert variant={'success'}>Password updated successfully!</Alert>
                        ) : (
                            <> </>
                        )}
                    </>
                )}
            </Jumbotron>
        );
    }
}
