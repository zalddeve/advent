import run from 'aocrunner';
import { getValues } from '../utils/index.js';

const parseInput = (rawInput: string) => getValues(rawInput);

const open_chars = ['(', '[', '{', '<'];
const close_chars = [')', ']', '}', '>'];
const error_points = [3, 57, 1197, 25137];
const autocomplete_points = [1, 2, 3, 4];

const check_syntax = (rows: string[]) => {
    let sum_error = 0;
    let arr_autocomplete: number[] = [];
    let sum_autocomplete = 0;

    for (const row of rows) {
        let stack: string[] = [];

        for (const char of row.split('')) {
            const isOpening = open_chars.includes(char);
            if (isOpening) {
                stack.push(char);
            } else {
                const lastOpen = stack.pop();
                const lastClose = char;

                if (!lastOpen || open_chars.indexOf(lastOpen) != close_chars.indexOf(lastClose)) {
                    sum_error += error_points[close_chars.indexOf(lastClose)];
                    stack = [];
                    break;
                }
            }
        }

        arr_autocomplete.push(calculate_autocomplete(stack));
    }

    arr_autocomplete = arr_autocomplete.filter(point => point).sort((p1, p2) => p1 - p2);
    sum_autocomplete = arr_autocomplete[Math.floor(arr_autocomplete.length / 2)];

    return { sum_error, sum_autocomplete };
};

const calculate_error = (close_char: string): number => {
    return error_points[close_chars.indexOf(close_char)];
};

const calculate_autocomplete = (stack: string[]): number => {
    let points = 0;
    // console.table(stack)

    while (stack) {
        const char = stack.pop();
        if (!char) break;
        const isOpening = open_chars.includes(char);
        if (isOpening) {
            // console.log(`${points * 5} + ${autocomplete_points[open_chars.indexOf(char)]} => ${points}`)
            points = +(points * 5) + autocomplete_points[open_chars.indexOf(char)];
        }
    }

    return points;
};

const part1 = (rawInput: string) => {
    const rows = parseInput(rawInput);
    return check_syntax(rows).sum_error;
};

const part2 = (rawInput: string) => {
    const rows = parseInput(rawInput);
    return check_syntax(rows).sum_autocomplete;
};

run({
    part1: {
        tests: [
            {
                input: `[({(<(())[]>[[{[]{<()<>>
                        [(()[<>])]({[<{<<[]>>(
                        {([(<{}[<>[]}>{[]{[(<()>
                        (((({<>}<{<{<>}{[]{[]{}
                        [[<[([]))<([[{}[[()]]]
                        [{[{({}]{}}([{[{{{}}([]
                        {<[[]]>}<{[{[{[]{()[[[]
                        [<(<(<(<{}))><([]([]()
                        <{([([[(<>()){}]>(<<{{
                        <{([{{}}[<[[[<>{}]]]>[]]`,
                expected: 26397,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `[({(<(())[]>[[{[]{<()<>>
                        [(()[<>])]({[<{<<[]>>(
                        {([(<{}[<>[]}>{[]{[(<()>
                        (((({<>}<{<{<>}{[]{[]{}
                        [[<[([]))<([[{}[[()]]]
                        [{[{({}]{}}([{[{{{}}([]
                        {<[[]]>}<{[{[{[]{()[[[]
                        [<(<(<(<{}))><([]([]()
                        <{([([[(<>()){}]>(<<{{
                        <{([{{}}[<[[[<>{}]]]>[]]`,
                expected: 288957,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
