const tokenize = require("./src/tokenize");
const parse = require("./src/parse");
const interpret = require("./src/interpret");

function defaultRNG(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Evaluates an expression in standard dice notation form
 *
 * @param {string} input
 * @param {number} limit Max number of dice rolls in a single evaluation
 * @param {(min: number, max: number) => number} rng Custom random generation function
 * @returns {number}
 * @throws Many different kinds of errors.
 */
function evaluate(input, limit = 10, rng = defaultRNG) {
    const tokens = tokenize(input);
    const AST = parse(tokens);

    return interpret(AST, limit, rng);
}

module.exports = evaluate;
