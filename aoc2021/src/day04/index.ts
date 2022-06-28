import run from 'aocrunner';
import { Matrix } from '../utils';

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    let numbers: number[] = [];
    const boards: number[][] = [];

    input
        .split('\n\n')
        .map((line) => line.trim())
        .forEach((line) => {
            if (!numbers.length) {
                numbers = line.split(',').map(Number);
            } else {
                // const boards: number[] = [];
                line.split('\n')
                    .map((line) => line.trim())
                    .forEach((row) => {
                        boards.push(row.replace(/[ ]+/g, ' ').split(' ').map(Number));
                    });
            }
        });

    console.log(boards);

    return;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return;
};

run({
    part1: {
        tests: [
            {
                input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

                        22 13 17 11  0
                         8  2 23  4 24
                        21  9 14 16  7
                         6 10  3 18  5
                         1 12 20 15 19

                         3 15  0  2 22
                         9 18 13 17  5
                        19  8  7 25 23
                        20 11 10 24  4
                        14 21 16 12  6

                        14 21 17 24  4
                        10 16 15  9 19
                        18  8 23 26 20
                        22 11 13  6  5
                         2  0 12  3  7`,
                expected: 4512,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            // {
            //   input: ``,
            //   expected: "",
            // },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
});
