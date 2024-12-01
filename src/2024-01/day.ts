import {A, pipe, S, flow, N, F} from '@mobily/ts-belt';
import {loadRawInput} from '../util';

type Pair = [number, number];
type Input = Pair[];

const part1 = (input: Input): number => {
    return pipe(
        input,
        A.unzip,
        ([left, right]) =>
            A.zip(A.sort(left, N.subtract), A.sort(right, N.subtract)),
        A.map(([left, right]) => Math.abs(right - left)),
        A.reduce(0, N.add),
    );
};

const part2 = (input: Input): number => {
    return pipe(
        input,
        A.unzip,
        ([lefts, rights]) =>
            A.map(lefts, left =>
                pipe(
                    A.filter(rights, right => left === right),
                    A.length,
                    N.multiply(left),
                ),
            ),
        A.reduce(0, N.add),
    );
};

const parse = (input: string): Input => {
    return pipe(
        input,
        S.split('\n'),
        A.map(flow(S.split('   '), A.map(Number), F.coerce<Pair>, F.toMutable)),
        F.toMutable,
    );
};

export const run = () => {
    // const input = parse(testInput);
    const input = parse(loadRawInput('2024-01'));
    console.log(part1(input));
    console.log(part2(input));
};

const testInput = `
3   4
4   3
2   5
1   3
3   9
3   3`.trim();
