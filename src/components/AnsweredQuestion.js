import React, {Component} from "react";
import {connect} from "react-redux";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import {formatDate} from "../utils/helpers";
import PageNotFound from "./PageNotFound";
import Avatar from "./Avatar";

class AnsweredQuestion extends Component {
    render() {
        const {question, author, authedUser} = this.props;

        if (question === null) {
            return <PageNotFound/>;
        }

        const {optionOne, optionTwo, timestamp} = question;
        const {name, avatarURL} = author;
        const totalVotes = optionOne.votes.length + optionTwo.votes.length;
        const optionOnePercent = Math.round(
            (optionOne.votes.length / totalVotes) * 100
        );
        const optionTwoPercent = Math.round(
            (optionTwo.votes.length / totalVotes) * 100
        );

        return (
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Card bg="light" className="m-3">
                        <Card.Header>
                            <Avatar avatarURL={avatarURL} className="mr-2"/>
                            {name} asks:
                        </Card.Header>

                        <Card.Body className="d-flex justify-content-center">
                            <ul>
                                <li>
                                    {optionOne.text}
                                    {optionOne.votes.includes(authedUser) ? (
                                        <span className="text-danger ml-2">&lt;- Your choice</span>
                                    ) : null}
                                </li>
                                <ProgressBar
                                    now={optionOnePercent}
                                    label={`${optionOnePercent}%`}
                                    variant="info"
                                />
                                <Card.Text className="text-muted">
                                    chosen by {optionOne.votes.length} out of {totalVotes} users
                                </Card.Text>
                                <li>
                                    {optionTwo.text}
                                    {optionTwo.votes.includes(authedUser) ? (
                                        <span className="text-danger ml-2">&lt;- Your choice</span>
                                    ) : null}
                                </li>
                                <ProgressBar
                                    now={optionTwoPercent}
                                    label={`${optionTwoPercent}%`}
                                    variant="info"
                                />
                                <Card.Text className="text-muted">
                                    chosen by {optionTwo.votes.length} out of {totalVotes} users
                                </Card.Text>
                            </ul>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">{formatDate(timestamp)}</small>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps({questions, users, authedUser}, {id}) {
    const question = questions[id];

    return {
        question: question ? question : null,
        author: question ? users[question.author] : null,
        authedUser,
    };
}

export default connect(mapStateToProps)(AnsweredQuestion);
