const evaluate = require("../");
const jestConfig = require("../jest.config");

// just returns the average value, rounded down
const fakeRNG = (min, max) => Math.floor((max + min) / 2);

describe.each([
    // VALID CASES
    ["1d5", fakeRNG(1, 5)],
    ["d5", fakeRNG(1, 5)],
    ["-d5", -fakeRNG(1, 5)],
    ["10d6 + 20", 10 * fakeRNG(1, 6) + 20],
    ["(50* 50)d( 10 +10)", 50 * 50 * fakeRNG(1, 10 + 10)],
    [
        "((14+14d37)+(((45-45d62)-(32-32d56))*(((19-19d22)+((37*37d66)-((29*11)/(48-48d54))))-((((14/8)*(91+3))+((17/17d17)*(69-69d100)))*(((44*10)-(85-5))*((76+1)-(55-8)))))))",
        -1130235126,
    ],

    // INVALID CASES
    [
        "((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((",
        new Error(`Expected token after "(", got none.`),
    ],
    ["5d-", new Error(`Unexpected token "-" after "d".`)],
    ["6e5", new Error(`Unexpected token "e" at column 2.`)],
    ["", new Error(`No tokens to parse.`)],
    ["3d10)", new Error(`Could not parse entire token list.`)],
    ["5dd6", new Error(`Unexpected token "d" after "d".`)],
    ["(5d6", new Error(`Expected a matching ")" after "6".`)],
    ["(1/0)d6", new Error(`Too many rolls.`)],
])("evaluate(%p) strict", (input, expected) => {
    const options = { limit: Infinity, rng: fakeRNG };
    if (expected instanceof Error) {
        it(`throws "${expected.message}"`, () => {
            expect(() => evaluate(input, options)).toThrow(expected);
        });
    } else {
        it(`returns ${expected}`, () => {
            expect(evaluate(input, options)).toEqual(expected);
        });
    }
});

describe("default RNG evaluate(%p)", () => {
    // this is to satisfy coverage
    globalThis.Math.random = () => 1;

    it(`returns 5`, () => {
        expect(evaluate("1d5")).toEqual(5);
    });
});

describe.each([
    // VALID CASES
    ["1d5", fakeRNG(1, 5)],
    ["d5", fakeRNG(1, 5)],
    ["-d5", -fakeRNG(1, 5)],
    ["10d6 + 20", 10 * fakeRNG(1, 6) + 20],
    ["(50* 50)d( 10 +10)", 50 * 50 * fakeRNG(1, 10 + 10)],
    [
        "((14+14d37)+(((45-45d62)-(32-32d56))*(((19-19d22)+((37*37d66)-((29*11)/(48-48d54))))-((((14/8)*(91+3))+((17/17d17)*(69-69d100)))*(((44*10)-(85-5))*((76+1)-(55-8)))))))",
        -1130235126,
    ],

    // INVALID CASES
    [
        "((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((",
        null,
    ],
    ["5d-", null],
    ["6e5", null],
    ["", null],
    ["3d10)", null],
    ["5dd6", null],
    ["(5d6", null],
    ["(1/0)d6", null],
])("evaluate (%p) non-strict", (input, expected) => {
    const options = { limit: Infinity, rng: fakeRNG, strict: false };
    if (expected === null) {
        it(`returns null`, () => {
            expect(evaluate(input, options)).toEqual(expected);
        });
    } else {
        it(`returns ${expected}`, () => {
            expect(evaluate(input, options)).toEqual(expected);
        });
    }
});
