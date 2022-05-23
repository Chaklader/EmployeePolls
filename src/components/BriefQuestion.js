import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {formatDate} from '../utils/helpers';
import Avatar from './Avatar';

class BriefQuestion extends Component {
    render() {
        const {question, author} = this.props;
        const {optionOne, timestamp, id} = question;
        const {name, avatarURL} = author;

        return (
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Card bg="light" className="m-3">
                        <Card.Header>
                            <Avatar avatarURL={avatarURL} className="mr-2"/>
                            {name} asks:
                        </Card.Header>
                        <Card.Body className="text-center">
                            <Card.Text>{optionOne.text.slice(0, 50)}...?</Card.Text>
                            <Link to={`/questions/${id}`}>
                                <Button variant="outline-dark">View Question</Button>
                            </Link>
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

function mapStateToProps({questions, users}, {id}) {
    const question = questions[id];

    return {
        question: question ? question : null,
        author: question ? users[question.author] : null
    };
}

export default connect(mapStateToProps)(BriefQuestion);
