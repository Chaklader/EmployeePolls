import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_ANSWER = 'ADD_ANSWER';

export function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	};
}

function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question
	};
}

function addAnswer({ qid, answer, authedUser }) {
	return {
		type: ADD_ANSWER,
		answerInfo: {
			qid,
			answer,
			authedUser
		}
	};
}


export function handleAddQuestion(optionOne, optionTwo) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestion({
			optionOneText: optionOne,
			optionTwoText: optionTwo,
			author: authedUser
		})
			.then((question) => dispatch(addQuestion(question)))
			.then(() => dispatch(hideLoading()));
	};
}

export function handleAddAnswer(qid, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState();

		dispatch(showLoading());

		return saveQuestionAnswer({
			qid,
			answer,
			authedUser
		})
			.then(() =>
				dispatch(
					addAnswer({
						qid,
						answer,
						authedUser
					})
				)
			)
			.then(() => dispatch(hideLoading()));
	};
}
