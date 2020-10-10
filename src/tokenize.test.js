
const tokenize = require("./tokenize");

describe.each([

    ["5d6", ["5", "d", "6"]],
    ["10+30*2/5d6", ["10", "+", "30", "*", "2", "/", "5", "d", "6"]],
    ["5d6a", new Error(`Unexpected token "a" at column 4`)]

])("tokenize(%p)", (input, expected) => {

    if (expected instanceof Error) {
        it(`throws "${expected.message}"`, () => {
            expect(() => tokenize(input)).toThrow(expected);
        });
    } else {
        it(`returns [${expected.join(", ")}]`, () => {
            expect(tokenize(input)).toEqual(expected);
        })
    }

})