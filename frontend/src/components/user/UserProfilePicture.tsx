import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Col from 'react-bootstrap/Col';
import { UpdateUserProfilePicturePayload } from 'src/store/user/user-action-payloads';

export interface UserProfilePictureStateProps {
    profilePictureBase64: string;
    userProfilePictureUpdateStatus: string;
}

export interface UserProfilePictureDispatchProps {
    updateUserProfilePicture: (updateUserProfilePicturePayload: UpdateUserProfilePicturePayload) => void;
    updateUserProfilePictureStatus: (status: string) => void;
}

type Props = UserProfilePictureStateProps & UserProfilePictureDispatchProps;

interface State {
    newProfilePicture: File;
    newProfilePicturePreviewString: string;
    existingProfilePictureBase64: string;
}

export default class UserProfilePicture extends React.Component<Props> {
    public readonly state: State;
    public constructor(props: Props) {
        super(props);
        this.state = {
            newProfilePicture: undefined as any,
            existingProfilePictureBase64: this.props.profilePictureBase64,
            newProfilePicturePreviewString: undefined as any,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    private handleInputChange(event: any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if (target.files && target.files[0]) {
            console.log('update file');
            this.setState({
                [name]: target.files[0],
                newProfilePicturePreviewString: URL.createObjectURL(target.files[0]),
            });
        } else {
            this.setState({
                [name]: value,
            });
        }
    }

    private submit(event: any) {
        event.preventDefault();
        const updateUserProfilePicturePayload: UpdateUserProfilePicturePayload = {
            newProfilePicture: this.state.newProfilePicture,
        };

        this.props.updateUserProfilePicture(updateUserProfilePicturePayload);
    }

    public render() {
        const userUpdateStatusCompleted: boolean = this.props.userProfilePictureUpdateStatus === 'COMPLETED';
        return (
            <Jumbotron fluid className="content-center">
                {this.props.userProfilePictureUpdateStatus === 'EDIT_MODE' ||
                this.props.userProfilePictureUpdateStatus === 'STARTED' ? (
                    <>
                        {this.state.newProfilePicture ? (
                            <>
                                <Image
                                    className="image-width"
                                    src={this.state.newProfilePicturePreviewString}
                                    roundedCircle
                                />
                            </>
                        ) : (
                            <>
                                <Image className="image-width" src={this.props.profilePictureBase64} roundedCircle />
                            </>
                        )}
                        <Col md={12}>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroupFileAddon01">
                                        Upload
                                    </span>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="inputGroupFile01"
                                        name="newProfilePicture"
                                        aria-describedby="inputGroupFileAddon01"
                                        onChange={this.handleInputChange}
                                    />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                                        Choose file
                                    </label>
                                </div>
                            </div>
                        </Col>
                        <Col md={12}>
                            <Button type="tertiary" className="ml-2 mt-2" onClick={this.submit}>
                                Upload Profile Picture
                            </Button>
                        </Col>

                        <Col md={12}>
                            <Button
                                type="tertiary"
                                className="ml-2 mt-2"
                                onClick={() => this.props.updateUserProfilePictureStatus('')}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </>
                ) : (
                    <>
                        <Image src={this.props.profilePictureBase64} roundedCircle />
                        <Row className="ml-2">
                            <Button className="mt-2" type="secondary">
                                Change Picture
                            </Button>
                            {userUpdateStatusCompleted ? (
                                <Alert variant={'success'}>Password updated successfully!</Alert>
                            ) : (
                                <> </>
                            )}
                        </Row>
                    </>
                )}
            </Jumbotron>
        );
    }
}
