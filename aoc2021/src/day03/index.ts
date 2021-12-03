import run from 'aocrunner';

function rotateMatrix(matrix: number[][]) {
    return matrix.reduce((rotatedMatrix, line) => {
        line.map((value, idx) => {
            rotatedMatrix[idx] = rotatedMatrix[idx] || [];
            rotatedMatrix[idx].push(value);
        });
        return rotatedMatrix;
    }, [] as number[][]);
}

const parseInput = (rawInput: string) => rawInput.split('\n').map((line) => [...line.trim()].map(Number));

const part1 = (rawInput: string) => {
    const input = rotateMatrix(parseInput(rawInput));

    const output = input.reduce(
        (output, line) => {
            output.gamma += line.filter((v) => v === 1).length > line.filter((v) => v === 0).length ? 1 : 0;
            output.epsilon += line.filter((v) => v === 1).length < line.filter((v) => v === 0).length ? 1 : 0;
            return output;
        },
        { gamma: '', epsilon: '' },
    );

    const powerConsumption = parseInt(output.gamma, 2) * parseInt(output.epsilon, 2);
    return powerConsumption;
};

const part2 = (rawInput: string) => {
    const matrix = parseInput(rawInput);

    let oxy_generator = [...matrix];
    let co2_scrubber = [...matrix];

    for (const i in matrix[0]) {
        if (oxy_generator.length > 1) {
            const oxy_generator_line = rotateMatrix(oxy_generator)[i];
            const oxy_generator_keep = oxy_generator_line.filter((v) => v === 1).length < oxy_generator_line.filter((v) => v === 0).length ? 0 : 1;
            oxy_generator = oxy_generator.filter((line) => line[i] === oxy_generator_keep);
        }

        if (co2_scrubber.length > 1) {
            const co2_scrubber_line = rotateMatrix(co2_scrubber)[i];
            const co2_scrubber_keep = co2_scrubber_line.filter((v) => v === 1).length < co2_scrubber_line.filter((v) => v === 0).length ? 1 : 0;
            co2_scrubber = co2_scrubber.filter((line) => line[i] === co2_scrubber_keep);
        }
    }

    console.log(oxy_generator[0].join(''), co2_scrubber[0].join(''));
    return parseInt(oxy_generator[0].join(''), 2) * parseInt(co2_scrubber[0].join(''), 2);
};

run({
    part1: {
        tests: [
            {
                input: `00100
                        11110
                        10110
                        10111
                        10101
                        01111
                        00111
                        11100
                        10000
                        11001
                        00010
                        01010`,
                expected: 198,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `00100
                        11110
                        10110
                        10111
                        10101
                        01111
                        00111
                        11100
                        10000
                        11001
                        00010
                        01010`,
                expected: 230,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
});
