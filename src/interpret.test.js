
const interpret = require("./interpret");

// just returns the average value, rounded down
const fakeRNG = (min, max) => Math.floor((max + min) / 2);

describe.each([

    [[5, 10, "+"], 15],
    [[1, 5, "d"], fakeRNG(1, 5)],
    [[1, 5, "d", 5, "+"], fakeRNG(6, 10)]

])("interpret(%p)", (AST, expected) => {

    it(`returns ${expected}`, () => {
        expect(interpret(AST, Infinity, fakeRNG)).toEqual(expected);
    });

})