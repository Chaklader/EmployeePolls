import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Login from "./components/Login";
import PrivateApp from "./components/PrivateApp";
import {handleInitialData} from "./actions/shared";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        const {authedUser, loadingBar} = this.props;
        if (loadingBar.default === undefined || loadingBar.default === 1) {
            return (
                <div className="d-flex justify-content-center">
                    <Spinner
                        animation="border"
                        role="status"
                        variant="secondary"
                        className="my-5"
                    >
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            );
        } else {
            return <Fragment>{!authedUser ? <Login/> : <PrivateApp/>}</Fragment>;
        }
    }
}

function mapStateToProps({authedUser, loadingBar}) {
    return {
        authedUser,
        loadingBar,
    };
}

export default connect(mapStateToProps)(App);
