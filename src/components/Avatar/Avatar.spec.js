import React from "react";
import {render} from "@testing-library/react";

import Avatar from "./Avatar";

describe("Snapshot test for at least one file.", () => {
    it("should match snapshot", async () => {
        const avatarURL = "https://tylermcginnis.com/would-you-rather/sarah.jpg";
        const tree = render(<Avatar avatarURL={avatarURL} className="mr-2"/>);
        expect(tree).toMatchSnapshot();
    });
});
