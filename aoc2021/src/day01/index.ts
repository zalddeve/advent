import run from 'aocrunner';

const parseInput = (rawInput: string): number[] => rawInput.split('\n').map(Number);

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let increaseCount = 0;
    let decreaseCount = 0;

    input.sort((e2: number, e1: number) => {
        e2 > e1 && increaseCount++;
        e2 < e1 && decreaseCount++;
        return 0;
    });

    return increaseCount;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    let increaseCount = 0;

    input.map((val, idx, arr) => {
        arr[idx] + arr[idx + 1] + arr[idx + 2] < arr[idx + 1] + arr[idx + 2] + arr[idx + 3] && increaseCount++;
    });

    return increaseCount;
};

run({
    part1: {
        tests: [
            {
                input: `199
                        200
                        208
                        210
                        200
                        207
                        240
                        269
                        260
                        263`,
                expected: 7,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `199
                        200
                        208
                        210
                        200
                        207
                        240
                        269
                        260
                        263`,
                expected: 5,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
});
