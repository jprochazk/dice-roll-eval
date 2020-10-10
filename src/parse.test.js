
const parse = require("./parse");

describe.each([

    [["10", "+", "5"], [10, 5, "+"]],
    [["10", "d", "(", "50", "+", "50", ")"], [10, 50, 50, "+", "d"]],
    [["10", "+", "(", "5", "+", "5"], new Error(`Expected a matching ")" after "5"`)]

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