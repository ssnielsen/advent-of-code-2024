import {A, N, pipe} from '@mobily/ts-belt';
import {loadRawInput} from '../util';

type Page = number;
type OrderRule = {x: Page; y: Page};
type OrderRules = OrderRule[];

type Update = Page[];
type Updates = Update[];

type Input = {
    orderRules: OrderRules;
    updates: Updates;
};

const isCorrectlyOrdered = (orderRules: OrderRules, update: Update) => {
    return pipe(
        update,
        A.mapWithIndex((index, page) => {
            const rulesAfter = orderRules.filter(rule => rule.x === page);
            const rulesBefore = orderRules.filter(rule => rule.y === page);

            const [before, after] = A.splitAt(update, index)!;

            const followsBefore = rulesBefore.every(
                rule => !after.includes(rule.x),
            );
            const followsAfter = rulesAfter.every(
                rule => !before.includes(rule.y),
            );

            return followsBefore && followsAfter;
        }),
        A.all(Boolean),
    );
};

const getMiddle = <T>(array: T[]) => {
    const middle = Math.floor(array.length / 2);
    return array[middle];
};

const part1 = (input: Input) => {
    const result = pipe(
        input.updates,
        A.filter(update => isCorrectlyOrdered(input.orderRules, update)),
        A.map(getMiddle),
        A.reduce(0, N.add),
    );

    return result;
};

const sort = (update: Update, orderRules: OrderRules) => {
    return A.sort(update, (a, b) => {
        const rulesAfter = orderRules.filter(
            rule => rule.x === a && rule.y === b,
        );
        const rulesBefore = orderRules.filter(
            rule => rule.x === b && rule.y === a,
        );

        if (rulesAfter.length > 0) {
            return -1;
        } else if (rulesBefore.length > 0) {
            return 1;
        } else {
            return 0;
        }
    }) as Update;
};

const part2 = (input: Input) => {
    return pipe(
        input.updates,
        A.filter(update => !isCorrectlyOrdered(input.orderRules, update)),
        A.map(update => sort(update, input.orderRules)),
        A.map(getMiddle),
        A.reduce(0, N.add),
    );
};

const parse = (input: string): Input => {
    const [orderRulesStr, updatesStr] = input.split('\n\n');
    const orderRules = orderRulesStr.split('\n').map(line => {
        const [x, y] = line.split('|').map(Number);
        return {x, y};
    });
    const updates = updatesStr
        .split('\n')
        .map(line => line.split(',').map(Number));
    return {orderRules, updates};
};

export const run = () => {
    // const input = parse(testInput);
    const input = parse(loadRawInput('2024-05'));
    console.log(part1(input));
    console.log(part2(input));
};

const testInput = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`.trim();
