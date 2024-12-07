import {A, N, pipe} from '@mobily/ts-belt';
import {loadRawInput} from '../util';

const part1 = (input: string) => {
    const regex = /mul\((\d+),(\d+)\)/g;

    const result = pipe(
        [...input.matchAll(regex)],
        A.map(([_, a, b]) => parseInt(a) * parseInt(b)),
        A.reduce(0, N.add),
    );

    return result;
};

const part2 = (input: string) => {
    // Remove all instances of don't()...do()
    const result = pipe(input.replace(/don't\(\)[\s\S]*?do\(\)/g, ''), part1);

    return result;
};

export const run = () => {
    // const input = testInput;
    const input = loadRawInput('2024-03');
    console.log(part1(input));
    console.log(part2(input));
};

const testInput =
    'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

const testInputPart2 =
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
