const tokenize = require("./src/tokenize");
const parse = require("./src/parse");
const interpret = require("./src/interpret");

function defaultRNG(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Evaluates an expression in standard dice notation form
 *
 * Options:
 * * limit - Max number of dice rolls in a single evaluation. Default is 10.
 * * rng - The random number generator used in dice rolls. Default implementation uses Math.random
 * * strict - Enable/disable strict mode. On by default.
 *
 * Strict mode causes the parser to throw on invalid syntax.
 *
 * @param {string} input
 * @param {{ limit?: number, rng?: (min: number, max: number) => number, strict?: boolean }} options
 * @returns {number}
 * @throws
 */
function evaluate(input, options = {}) {
    const limit = options.limit !== undefined ? options.limit : 10;
    const rng = options.rng !== undefined ? options.rng : defaultRNG;
    const strict = options.strict !== undefined ? options.strict : true;

    try {
        const tokens = tokenize(input);
        const AST = parse(tokens, strict);
        return interpret(AST, limit, rng);
    } catch (error) {
        if (strict) {
            throw error;
        }
    }
    return null;
}

module.exports = evaluate;
