import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
} from "./_DATA.js";

export function getInitialData() {
    const r = _getUsers();
    return Promise.all([_getUsers(), _getQuestions()]).then(
        ([users, questions]) => ({
            users,
            questions,
        })
    );
}

export function saveQuestion(question) {
    return _saveQuestion(question);
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info);
}
