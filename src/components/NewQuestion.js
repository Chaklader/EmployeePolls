import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {handleAddQuestion} from "../actions/questions";

class NewQuestion extends Component {
    state = {
        optionOne: "",
        optionTwo: "",
        toHome: false,
    };

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        const {optionOne, optionTwo} = this.state;
        const {dispatch} = this.props;

        e.preventDefault();

        this.setState(
            {
                optionOne: "",
                optionTwo: "",
                toHome: true,
            },
            () => dispatch(handleAddQuestion(optionOne, optionTwo))
        );
    };

    render() {
        const {optionOne, optionTwo, toHome} = this.state;

        if (toHome === true) return <Redirect to="/"/>;

        return (
            <Fragment>
                <h2 className="text-center my-3">
                    <small>Would You Rather...</small>
                </h2>
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <Card bg="light" className="m-3 text-center">
                            <Card.Body>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="optionOne">
                                        <Form.Label>Choice One</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="optionOne"
                                            value={optionOne}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <h3>
                                        <small>OR</small>
                                    </h3>
                                    <Form.Group controlId="optionTwo">
                                        <Form.Label>Choice Two</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="optionTwo"
                                            value={optionTwo}
                                            onChange={this.handleInputChange}
                                        />
                                    </Form.Group>
                                    <Button
                                        type="submit"
                                        variant="outline-dark"
                                        disabled={optionOne === "" || optionTwo === ""}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default connect()(NewQuestion);
