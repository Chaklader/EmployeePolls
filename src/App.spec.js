import React from "react";
import {render, fireEvent} from "@testing-library/react";
import {applyMiddleware, createStore, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import rootReducer from "./reducers";

describe("Verify that", () => {
    it("Login flow work.", async () => {
        const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
        const tree = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve(true);
            }, 1000)
        );

        const select = tree.getByTestId("submit-select");
        const selectUser = "sarahedo";
        await fireEvent.change(select, {target: {value: selectUser}});
        const el = tree.getByTestId("submit-btn");
        await fireEvent.click(el);

        expect(tree).toMatchSnapshot();
    }, 30000);

    it("navigation has to have home, new question, leaderboard.", async () => {
        const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
        const tree = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve(true);
            }, 1000)
        );

        const select = tree.getByTestId("submit-select");
        const selectUser = "sarahedo";
        await fireEvent.change(select, {target: {value: selectUser}});
        const el = tree.getByTestId("submit-btn");
        await fireEvent.click(el);

        expect(tree.getByTestId("navigation-home")).toBeDefined();
        expect(tree.getByTestId("navigation-new-question")).toBeDefined();
        expect(tree.getByTestId("navigation-leaderboard")).toBeDefined();
    }, 30000);
});
