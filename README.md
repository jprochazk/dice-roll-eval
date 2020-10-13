# dice-roll-eval

<p align="center">
    <a href='https://travis-ci.com/jprochazk/dice-roll-eval'>
        <img src='https://travis-ci.org/jprochazk/dice-roll-eval.svg?branch=master' alt='Build Status' />
    </a>
    <a href='https://coveralls.io/github/jprochazk/dice-roll-eval?branch=master'>
        <img src='https://coveralls.io/repos/github/jprochazk/dice-roll-eval/badge.svg?branch=master' alt='Coverage Status' />
    </a>
</p>

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

const result = evaluate("5d6 + 10");
// ...
```

`evaluate` also takes two optional parameters, `limit` and `rng`. 

`limit`: A dice roll like `5d6` will roll a 6-sided die 5 times. These rolls have to be executed in sequence, and in this library, that is done inside of a while loop. This stalls the event loop. To ensure that a user can't do something like `(1/0)d6` (i.e. roll a D6 Infinity times), you can set the maximum number of sequential rolls. The default is 10.

`rng`: The random number generation function, which must have the following signature:

```js
(min: number, max: number) => number;
```

The `min` and `max` numbers specify the range in which values should be generated, e.g. the call `YOUR_RNG_FUNCTION(10, 2000)` should generate a number within the range <10; 2000>. This parameter exists so that you can provide your own RNG implementation, such as a [Mersenne Twister](https://en.wikipedia.org/wiki/Mersenne_Twister). The default implementation uses `Math.random` and can be found [here](https://github.com/jprochazk/dice-roll-eval/blob/master/index.js#L5).

### Tests

Tests are built with [Jest](https://jestjs.io/).

```
$ yarn test
```

To report test coverage, execute `yarn test:coverage`.

### Notes

Built for [supi-core](https://github.com/Supinic/supi-core).

This was my excuse to learn more about parsing strings. Yes, it is slightly overkill... :)