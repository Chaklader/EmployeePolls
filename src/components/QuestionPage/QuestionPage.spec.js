import React from "react";
import {render} from "@testing-library/react";
import {applyMiddleware, createStore, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./../../reducers";
import {handleInitialData} from "../../actions/shared";
import QuestionPage from "./QuestionPage";
import {setAuthedUser} from "../../actions/authedUser";

describe("Verify that the percentage of people who voted for an option is calculated and displayed correctly", () => {
    it("should match snapshot", async () => {
        const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
        await handleInitialData()(store.dispatch);
        store.dispatch(setAuthedUser("johndoe"));
        const questionId = "xj352vofupe1dqz9emx13r";
        const tree = render(
            <Provider store={store}>
                <QuestionPage match={{params: {id: questionId}}}/>
            </Provider>
        );

        const q = store.getState().questions[questionId];
        const totalVotes = q.optionOne.votes.length + q.optionTwo.votes.length;
        const optionOnePercent = Math.round(
            (q.optionOne.votes.length / totalVotes) * 100
        );

        const {findAllByText} = tree;
        const percentage = await findAllByText(`${optionOnePercent}%`);

        expect(percentage).toBeDefined();
    });
});
