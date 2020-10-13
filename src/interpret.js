function rollDice(times, sides, limit, rng) {
    if (times >= limit) throw new Error(`Too many rolls.`);
    let sum = 0;
    while (times-- > 0) {
        sum += rng(1, sides);
    }
    return sum;
}

/**
 * This is a stack-based interpreter, which interprets reverse polish notation (https://en.wikipedia.org/wiki/Reverse_Polish_notation)
 * similarly to a bytecode virtual machine.
 *
 * @param {string[]} insts Instructions in reverse polish notation
 * @param {number} limit max number of rolls in a single evaluation
 * @param {Function} rng Function which takes two numbers, and returns a number.
 *                       It should be random, but that's entirely up to the user.
 */
function interpret(insts, limit, rng) {
    let stack = [];
    let ip = 0;
    while (ip < insts.length) {
        const inst = insts[ip++];
        //console.log(`before ${inst}`, stack);
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
        //console.log(`after ${inst}`, stack);
    }
    // And here is our result
    return Math.round(stack.pop());
}

module.exports = interpret;
