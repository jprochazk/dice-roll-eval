
const parse = require("./parse");

describe.each([

    // VALID CASES
    [["10", "+", "5"], [10, 5, "+"]],
    [["10", "-", "5"], [10, 5, "-"]],
    [["10", "*", "5"], [10, 5, "*"]],
    [["10", "/", "5"], [10, 5, "/"]],
    [["-", "5"], [5, "~"]],
    [["d", "5"], [1, 5, "d"]],
    [["10", "d", "(", "50", "+", "50", ")"], [10, 50, 50, "+", "d"]],

    // INVALID CASES
    [["10", "+", "(", "5", "+", "5"], new Error(`Expected a matching ")" after "5".`)],
    [["1", "+"], new Error(`Expected token after "+", got none.`)]

])("parse(%p)", (tokenList, expected) => {

    if (expected instanceof Error) {
        it(`throws "${expected.message}"`, () => {
            expect(() => parse(tokenList)).toThrow(expected);
        });
    } else {
        it(`returns [${expected.join(", ")}]`, () => {
            expect(parse(tokenList)).toEqual(expected);
        });
    }

});