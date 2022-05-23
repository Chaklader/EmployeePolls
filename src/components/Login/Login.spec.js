import React from "react";
import {render, fireEvent} from "@testing-library/react";

import {Login} from "./Login";

describe("Write a DOM test for at least one file which uses the fireEvent function + ", () => {
    it("should call submit", async () => {
        const dispatch = jest.fn();
        const selectUser = "user1";
        const tree = render(
            <Login userNames={[{value: selectUser}]} dispatch={dispatch}/>
        );
        const {getByTestId} = tree;
        const el = getByTestId("submit-btn");
        expect(dispatch).not.toBeCalled(); // Not select User

        const select = getByTestId("submit-select");
        await fireEvent.change(select, {target: {value: selectUser}});

        await fireEvent.click(el); // Done select User
        expect(dispatch).toBeCalled();
    });
});
