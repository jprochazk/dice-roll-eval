const interpret = require("./interpret");

// just returns the average value, rounded down
const fakeRNG = (min, max) => Math.floor((max + min) / 2);

describe.each([
    // VALID CASES
    [[5, 10, "+"], 15],
    [[1, 5, "d"], fakeRNG(1, 5)],
    [[1, 5, "d", 5, "+"], fakeRNG(6, 10)],

    // INVALID CASES
    [[Infinity, 5, "d"], new Error("Too many rolls.")],
    [[Infinity, 10, "d", 5, "+"], new Error("Too many rolls.")],
])("interpret(%p)", (AST, expected) => {
    if (expected instanceof Error) {
        it(`throws ${expected}`, () => {
            expect(() => interpret(AST, Infinity, fakeRNG)).toThrow(expected);
        });
    } else {
        it(`returns ${expected}`, () => {
            expect(interpret(AST, Infinity, fakeRNG)).toEqual(expected);
        });
    }
});
