import React from "react";
import { render } from "@testing-library/react";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import LeaderBoard from "./LeaderBoard";
import rootReducer from "./../../reducers";
import { handleInitialData } from "../../actions/shared";

describe("Verify that the leaderboard", () => {
  it("Displaying the correct user name, the number of questions asked, and the number of questions answered.", async () => {
    const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
    await handleInitialData()(store.dispatch);
    const { users } = store.getState();
    const tree = render(
      <Provider store={store}>
        <LeaderBoard />
      </Provider>
    );

    const { container } = tree;

    const sortedUserIDs = Object.keys(users).sort((idA, idB) => {
      const scoreA =
        Object.keys(users[idA].answers).length + users[idA].questions.length;
      const scoreB =
        Object.keys(users[idB].answers).length + users[idB].questions.length;

      return scoreB - scoreA;
    });

    const found = await Promise.all(
      sortedUserIDs.map((_, index) => {
        return tree.getByTestId(`user-stat-${index}`);
      })
    );
    expect(container.childNodes[1]).toBe(found[0]);

    found.map((f, index) => {
      expect(container.childNodes[index + 1]).toBe(f);
    });

    expect(tree).toMatchSnapshot();
  }, 30000);
});
