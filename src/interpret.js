function rollDice(times, sides, limit, rng) {
    if (times >= limit) throw new Error(`Too many rolls.`);

    let sum = 0;
    while (times-- > 0) {
        sum += rng(1, sides);
    }
    return sum;
}

/**
 * This is a stack-based interpreter, which evaluates mathematical expressions in
 * postfix notation (https://en.wikipedia.org/wiki/Reverse_Polish_notation).
 *
 * @param {string[]} insts Instructions in reverse polish notation
 * @param {number} limit max number of rolls in a single evaluation
 * @param {(min: number, max: number) => number} rng Random number generation function
 */
function interpret(insts, limit, rng) {
    let stack = [];
    let ip = 0;
    while (ip < insts.length) {
        const inst = insts[ip++];
        switch (inst) {
            case "+": {
                const right = stack.pop();
                const left = stack.pop();

                stack.push(left + right);
                break;
            }
            case "-": {
                const right = stack.pop();
                const left = stack.pop();

                stack.push(left - right);
                break;
            }
            case "*": {
                const right = stack.pop();
                const left = stack.pop();

                stack.push(left * right);
                break;
            }
            case "/": {
                const right = stack.pop();
                const left = stack.pop();

                stack.push(left / right);
                break;
            }
            case "d": {
                const right = stack.pop();
                const left = stack.pop();

                stack.push(rollDice(left, right, limit, rng));
                break;
            }
            case "~": {
                let value = stack.pop();

                stack.push(-value);
                break;
            }
            default: {
                stack.push(inst);
                break;
            }
        }
    }
    return Math.round(stack.pop());
}

module.exports = interpret;
