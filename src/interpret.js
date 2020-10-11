
function rollDice(times, sides, limit, rng) {
    let sum = 0;
    while (times-- > 0) {
        if (limit-- === 0) throw new Error(`Too many rolls.`);
        sum += rng(1, sides);
    }
    return sum;
}

function defaultRandom(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * This is a stack-based interpreter, which interprets reverse polish notation (https://en.wikipedia.org/wiki/Reverse_Polish_notation)
 * similarly to a bytecode virtual machine.
 * 
 * @param {string[]} insts Instructions in reverse polish notation
 */
function interpret(insts, limit = 10, rng = defaultRandom) {
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