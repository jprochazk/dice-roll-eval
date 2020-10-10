const tokenize = require("./src/tokenize");
const parse = require("./src/parse");
const interpret = require("./src/interpret");

/**
 * Evaluates an expression in standard dice notation form
 * 
 * @param {string} input
 * @param {number} limit max number of rolls in a single evaluation
 * @param {Function} rng Function which takes two numbers, and returns a number.
 *                       It should be random, but that's entirely up to the user.
 * @returns {number}
 * @throws {Error}
 */
function evaluate(input, limit, rng) {
    const tokens = tokenize(input);
    const AST = parse(tokens);
    
    return interpret(AST, limit, rng);
}

module.exports = evaluate;