import {A, F, flow, N, pipe, S} from '@mobily/ts-belt';
import {loadRawInput, log} from '../util';

type Level = number;
type Report = Level[];
type Input = Report[];

const aperture =
    (size: number) =>
    <T>(list: T[]): T[][] => {
        const result: T[][] = [];

        for (let i = 0; i < list.length - size + 1; i++) {
            result.push(list.slice(i, i + size));
        }

        return result;
    };

const compute =
    (isSafe: (report: Report) => boolean) =>
    (input: Input): number => {
        return pipe(
            input,
            A.filter(report => {
                const normal = isSafe(report);
                const reversed = isSafe([...report].reverse());
                return normal;
            }),
            A.length,
        );
    };

const part1IsSafe = (report: Report) => {
    return pipe(
        report,
        aperture(2),
        A.every(([a, b]) => Math.abs(a - b) <= 3 && a < b),
    );
};

const makeRange = (start: number, end: number) => {
    return Array.from({length: end - start + 1}, (_, i) => start + i);
};

const removeIndexFromArray = (index: number, array: Report) => {
    return [...array.slice(0, index), ...array.slice(index + 1)];
};

const part2IsSafe = (report: Report) => {
    return pipe(
        report,
        report => {
            return makeRange(0, report.length - 1).map(i => {
                return removeIndexFromArray(i, report);
            });
        },
        A.map(test => part1IsSafe(test)),
        // log,
        A.map(Number),
        A.reduce(0, N.add),
        n => n === 0,
        // A.filter(flow(A.filter(a => a))),
        // A.filter(subs =>
        //     pipe(
        //         subs,
        //         A.length,
        //         length => length <= 1,
        //     ),
        // ),
        // log,
        // A.map(([test, isSafe]) => test),
        // A.length,
        // length => length === 0,
    );
};

const part1 = compute(part1IsSafe);
const part2 = compute(part2IsSafe);

const parse = (input: string): Input => {
    return pipe(
        input,
        S.split('\n'),
        A.map(flow(S.split(' '), A.map(Number), F.coerce<Report>, F.toMutable)),
        F.toMutable,
    );
};

export const run = () => {
    const input = parse(testInput);
    // const input = parse(loadRawInput('2024-02'));
    // console.log(input);
    // console.log(part1(input));
    console.log(part2(input));
};

const testInput = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`.trim();
