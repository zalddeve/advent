import run from 'aocrunner';
import { Transform, TransformCallback, Writable } from 'stream';
import { getValues, Matrix } from '../utils/index.js';

const parseInput = (rawInput: string) => getValues<number>(rawInput, ',', true);

const part1 = (rawInput: string) => {
    let input = parseInput(rawInput);

    for (let day = 1; day <= 80; day++) {
        let newCount = 0;

        // input = input.map((value) => {
        //     if (value === 0) {
        //         ++newCount;
        //         return 6;
        //     } else {
        //         return --value;
        //     }
        // });

        for (let i = 0; i < input.length; i++) {
            if (input[i] === 0) {
                ++newCount;
                input[i] = 6;
            } else {
                input[i] -= 1;
            }
        }

        for (newCount; newCount > 0; --newCount) {
            input.push(8)
        }
    }

    return input.length;
};

const part2 = (rawInput: string) => {
    let input = parseInput(rawInput);

    const population = new Array(9).fill(0);
    input.map(fish => ++population[fish]);

    for (let day = 1; day <= 256; day++) {
        const add = population[0];

        for (let i = 0; i < 8; i++) {
            population[i] = population[i+1];
        }

        population[6] += add;
        population[8] = add;
    }

    return population.reduce((acc, curr) => acc + curr);
};

run({
    part1: {
        tests: [
            {
                input: `3,4,3,1,2`,
                expected: 5934,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `3,4,3,1,2`,
                expected: 26984457539,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
