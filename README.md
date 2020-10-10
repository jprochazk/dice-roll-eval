# dice-roll-eval

Built for [supi-core](https://github.com/Supinic/supi-core).

JS module used for evaluating standard dice notation expressions. The module can actually evaluate simple mathematical expressions, consisting of integers and operators `+`, `-`, `*`, `/`, as well as sub-expressions enclosed in parentheses. To (mostly) comply with standard dice notation, an additional operator is implemented: `d`. This operator takes the form `AdX` or `dX`, where `A` is the number of rolls of `X`-sided die.

### Expression examples

```
5d6 -> rolls a 6-sided die, 5 times
5d6 + 10 -> rolls a 6-sided die, 5 times, and adds 10 to the result.
5d6 / 2 -> rolls a 6-sided die, 5 times, and divides the result by 2.
(10*10)d(10*10) -> rolls a (10*10)-sided die, (10*10) times.
```

### Usage

Expressions are passed as plain strings to the module, which returns a number. The evaluation may throw.

```js
const evaluate = require("dice-roll-eval");

evaluate("5d6 + 10");
evaluate("d10");
evaluate("(10*10)d10");
```

This was my excuse to learn more about parsing strings. Yes, it is overkill. :)