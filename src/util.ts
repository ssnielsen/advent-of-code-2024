import {F, S, pipe} from '@mobily/ts-belt';
import {readFileSync} from 'fs';

export const loadInput = (day: string) =>
    pipe(loadRawInput(day), S.split('\n')) as string[];

export const loadRawInput = (day: string) =>
    pipe(
        `${__dirname}/${day}/input`,
        F.tap(filename => console.log(`Reading file from ${filename}`)),
        filename => readFileSync(filename, 'utf-8'),
        S.trim,
    );

export const log = <T>(value: T): T => {
    console.log(value);
    return value;
};
