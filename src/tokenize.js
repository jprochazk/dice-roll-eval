/**
 * Turns a string into a list of tokens
 *
 * @param {string} str Input string
 * @returns {string[]} List of tokens
 * @throws {Error} In case of unrecognized token
 */
function tokenize(str) {
    if (!str || str.length === 0) return [];
    // lower-case and no whitespace
    str = str.toLowerCase().replace(/\s/g, "");

    // try to find bad tokens by matching anything that is not in the accepted token set
    // accepted tokens: digits [\d], operators [\*, \+, \-, \/, d], parentheses [\(\)]
    const unrecognized = str.match(/[^d\+\-\*\/\d\(\)]+/);
    if (unrecognized !== null)
        throw new Error(
            `Unexpected token "${unrecognized[0]}" at column ${
                unrecognized.index + 1
            }.`
        );

    // tokenization is basically just regex matching all the accepted tokens
    return [...str.match(/(\d+)|[\+\-\*\/d\(\)]/g)];
}

module.exports = tokenize;
