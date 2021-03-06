class TokenList {
    tokens = [];
    pointer = 0;

    constructor(tokens) {
        this.tokens = tokens;
        this.pointer = 0;
    }

    /**
     * @type {(string|undefined)}
     */
    get current() {
        return this.tokens[this.pointer];
    }

    /**
     * @type {(string|undefined)}
     */
    get previous() {
        return this.tokens[this.pointer - 1];
    }

    advance() {
        this.pointer += 1;
        return this.previous;
    }
}

/**
 * Parses binary "+" or "-" operator
 */
function parse_binary0(tokenList) {
    let left = parse_binary1(tokenList);
    if (["+", "-"].includes(tokenList.current)) {
        const op = tokenList.advance();
        const right = parse_binary1(tokenList);
        left = [...left, ...right, op];
    }
    return left;
}

/**
 * Parses "*" or "/" operator
 */
function parse_binary1(tokenList) {
    let left = parse_unary(tokenList);
    if (["*", "/"].includes(tokenList.current)) {
        const op = tokenList.advance();
        const right = parse_unary(tokenList);
        left = [...left, ...right, op];
    }
    return left;
}

/**
 * Parses unary "+" or "-" operator
 */
function parse_unary(tokenList) {
    if (tokenList.current === "-") {
        tokenList.advance();
        return [...parse_unary_dice(tokenList), "~"];
    }
    return parse_unary_dice(tokenList);
}

/**
 * Parses unary "d" operator
 */
function parse_unary_dice(tokenList) {
    if (tokenList.current === "d") {
        tokenList.advance();
        return [1, ...parse_terminal(tokenList), "d"];
    }
    return parse_binary_dice(tokenList);
}

/**
 * Parses binary "d" operator
 */
function parse_binary_dice(tokenList) {
    let left = parse_terminal(tokenList);
    if (tokenList.current === "d") {
        tokenList.advance();
        const right = parse_terminal(tokenList);
        left = [...left, ...right, "d"];
    }
    return left;
}

/**
 * Parses a numeric value or sub-expression (enclosed in parentheses)
 *
 * @throws {Error} If an unexpected token is encountered, or if there are no further tokens.
 */
function parse_terminal(tokenList) {
    if (tokenList.current === "(") {
        tokenList.advance();
        const expr = parse_binary0(tokenList);
        if (tokenList.current != ")") {
            throw new Error(
                `Expected a matching ")" after "${tokenList.previous}".`
            );
        }
        tokenList.advance();
        return expr;
    }

    if (!Number.isNaN(Number(tokenList.current))) {
        return [Number(tokenList.advance())];
    }

    if (tokenList.current === undefined) {
        throw new Error(
            `Expected token after "${tokenList.previous}", got none.`
        );
    } else {
        throw new Error(
            `Unexpected token "${tokenList.current}" after "${tokenList.previous}".`
        );
    }
}

/**
 * Recursive descent parser
 *
 * Transforms infix notation to postfix notation ([5, +, 5] to [5, 5, +]). Postfix notation
 * can be easily evaluated using a stack-based interpreter.
 *
 * It operates by "descending" down a list of possible tokens,
 * until it parses the entire token list, or finds an unexpected/missing token.
 *
 * @param {string[]} tokens
 * @throws {Error} In case of invalid or empty token list.
 */
function parse(tokens) {
    if (tokens.length === 0) {
        throw new Error(`No tokens to parse.`);
    }
    const list = new TokenList(tokens);

    const insts = parse_binary0(list);
    if (list.pointer < list.tokens.length) {
        throw new Error(`Could not parse entire token list.`);
    }

    return insts;
}

module.exports = parse;
