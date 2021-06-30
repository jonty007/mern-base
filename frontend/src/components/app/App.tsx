import React from 'react';
import './App.scss';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { ActionSteps } from '../../routing/constants/steps';
import AppRouter from '../../routing/AppRouter';
import { FaPaw } from 'react-icons/fa';

export interface AppDispatchProps {
    init: (step: string) => void;
}

export interface AppStateProps {
    isLoading: boolean;
}

type Props = AppDispatchProps & AppStateProps;

export default class App extends React.Component<Props> {
    public constructor(props: Props) {
        super(props);

        this.submit = this.submit.bind(this);
    }

    private submit(step: string) {
        this.props.init(step);
    }

    public render() {
        return (
            <>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand onClick={() => this.submit(ActionSteps.SET_MAIN_DASHBOARD)}>
                        Mern App <FaPaw />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar>
                <Col className="mt-2">
                    <AppRouter />
                </Col>
            </>
        );
    }

    public componentDidMount() {
        this.props.init(ActionSteps.SET_LANDING_PAGE);
    }
}
