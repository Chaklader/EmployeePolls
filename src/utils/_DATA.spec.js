import {_saveQuestion, _saveQuestionAnswer} from "./_DATA";


describe("Verify that the saved question is returned and all expected fields are populated when correctly formatted data is passed to the function", () => {
    it("should be able to save question", async () => {
        const author = "johndoe";
        const r = await _saveQuestion({
            optionOneText: "a",
            optionTwoText: "b",
            author,
        });

        expect(r.id).toBeDefined();
        expect(r.author).toEqual(author);
    });
});

describe("Verify that an error is returned if incorrect data is passed to the save question function.", () => {
    it("should throw error if not passing optionOneText", async () => {
        const author = "johndoe";
        let err;
        try {
            await _saveQuestion({
                mockProp: "a",
                optionTwoText: "b",
                author,
            });
        } catch (_err) {
            err = _err;
        }
        expect(err.message).toBe("Invalid question");
    });

    it("should throw error if not passing optionTwoText", async () => {
        // Update code to pass this test
        const author = "johndoe";
        let err;
        try {
            await _saveQuestion({
                optionOneText: "a",
                mockProp: "b",
                author,
            });
        } catch (_err) {
            err = _err;
        }
        expect(err.message).toBe("Invalid question");
    });

    it("should throw error if not passing correct user", async () => {
        const author = "johnde";
        let err;
        try {
            await _saveQuestion({
                optionOneText: "a",
                optionTwoText: "b",
                author,
            });
        } catch (_err) {
            err = _err;
        }

        expect(err).toBeDefined();
    });
});

describe("Verify that the saved question answer is returned and all expected fields are populated when correctly formatted data is passed to the function", () => {
    it("should be able to save question", async () => {
        const authedUser = "johndoe";
        const r = await _saveQuestionAnswer({
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionTwo",
            authedUser,
        });
        expect(r.author).toEqual("sarahedo");
    });
});

describe("Verify that an error is returned if incorrect data is passed to the save answer function.", () => {
    it("should throw error with invalid question", async () => {
        const authedUser = "johndoe";
        let err;
        try {
            const r = await _saveQuestionAnswer({
                qid: "invalid",
                answer: "optionTwo",
                authedUser,
            });
        } catch (_err) {
            err = _err;
        }
        expect(err.message).toEqual(
            "Cannot read properties of undefined (reading 'optionTwo')"
        );
    });

    it("should throw error with invalid question", async () => {
        const authedUser = "johndoe";
        const invalidQuestion = "8xf0y6ziyjabvozdd253nd";
        let err;
        try {
            await _saveQuestionAnswer({
                qid: invalidQuestion,
                answer: "invalid",
                authedUser,
            });
        } catch (_err) {
            err = _err;
        }

        expect(err.message).toEqual("Cannot read properties of undefined (reading 'votes')");
    });
});
