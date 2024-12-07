import {A, N, pipe, S} from '@mobily/ts-belt';
import {loadRawInput} from '../util';

type Grid = string[][];

const transpose = (grid: Grid) => {
    return grid[0].map((_, i) => grid.map(row => row[i]));
};

const rotate = (grid: Grid) => {
    return grid.map((_, i) => grid.map(row => row[i]).reverse());
};

const getDiagonals = (grid: Grid) => {
    const diagonals = [];

    const n = grid.length;

    for (let i = 0; i < n; i++) {
        const diagonal = [];

        for (let j = 0; j < n; j++) {
            if (i + j < n) {
                diagonal.push(grid[j][i + j]);
            }
        }

        diagonals.push(diagonal);
    }

    for (let i = 1; i < n; i++) {
        const diagonal = [];

        for (let j = 0; j < n; j++) {
            if (i + j < n) {
                diagonal.push(grid[i + j][j]);
            }
        }

        diagonals.push(diagonal);
    }

    return diagonals;
};

const printGrid = (grid: Grid) => {
    console.log(grid.map(line => line.join('')).join('\n'));
};

const getAllLines = (grid: Grid) => {
    const horizontal = grid.map(line => line.join(''));
    const horizontalReversed = grid.map(line => line.reverse().join(''));
    const diagonals = getDiagonals(grid).map(line => line.join(''));
    const diagonalsReversed = getDiagonals(
        grid.map(line => line.reverse()),
    ).map(line => line.join(''));

    const transposed = transpose(grid);
    const vertical = transposed.map(line => line.join(''));
    const verticalReversed = transposed.map(line => line.reverse().join(''));

    const rotatedTwice = rotate(rotate(grid));
    const diagonals2 = getDiagonals(rotatedTwice).map(line => line.join(''));
    const diagonalsReversed2 = getDiagonals(
        rotatedTwice.map(line => line.reverse()),
    ).map(line => line.join(''));

    const allLines = [
        ...horizontal,
        ...horizontalReversed,
        ...diagonals,
        ...diagonalsReversed,
        ...vertical,
        ...verticalReversed,
        ...diagonals2,
        ...diagonalsReversed2,
    ];

    return allLines;
};

const aperture =
    <T>(n: number) =>
    (list: T[]) => {
        return list.map((_, i) => list.slice(i, i + n));
    };

const countXmas = (line: string) => {
    return [...line.matchAll(/XMAS/g)].length;
};

const part1 = (input: Grid) => {
    const allLines = getAllLines(input);

    return pipe(allLines, A.map(countXmas), A.reduce(0, N.add));
};

const part2 = (input: Grid) => {
    let count = 0;

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (input[i][j] !== 'A') {
                continue;
            }

            const ne = input[i - 1]?.[j + 1];
            const se = input[i + 1]?.[j + 1];
            const nw = input[i - 1]?.[j - 1];
            const sw = input[i + 1]?.[j - 1];

            const neToSw = `${ne}${sw}`;
            const seToNw = `${se}${nw}`;

            if (
                (neToSw === 'MS' || neToSw === 'SM') &&
                (seToNw === 'MS' || seToNw === 'SM')
            ) {
                count++;
            }
        }
    }

    return count;
};

const parse = (input: string) => {
    return pipe(input, S.split('\n'), A.map(S.split(''))) as Grid;
};

export const run = () => {
    // const input = parse(testInput);
    const input = parse(loadRawInput('2024-04'));
    console.log(part1(input));
    console.log(part2(input));
};

const testInput = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.trim();
