import run from 'aocrunner';
import { getValues } from '../utils/index.js';

const parseInput = (rawInput: string) => getValues<number>(rawInput, ',', true);

const linear = (diff: number) => diff;
const triangular = (diff: number) => (diff * (diff + 1)) / 2;

const calculate_fuel_consumption = (crab_map: number[], target_position: number, method: (diff: number) => number) => {
    return crab_map.reduce((fuel_consumption, number_of_crabs, position) => {
        return (fuel_consumption += method(Math.abs(position - target_position)) * number_of_crabs);
    }, 0);
};

const calculate_min_fuel_consumption = (rawInput: string, calc_method: (diff: number) => number) => {
    const input = parseInput(rawInput);
    const crab_map = new Array(Math.max(...input) + 1).fill(0);
    for (const value of input) {
        ++crab_map[value];
    }

    let min_fuel_consumption = NaN;
    for (let position = 0; position < crab_map.length; position++) {
        const actual_fuel_consumption = calculate_fuel_consumption(crab_map, position, calc_method);
        min_fuel_consumption = Math.min(min_fuel_consumption, actual_fuel_consumption) || actual_fuel_consumption;
        if (min_fuel_consumption && actual_fuel_consumption > min_fuel_consumption) break;
    }

    return min_fuel_consumption;
};

const part1 = (rawInput: string) => {
    return calculate_min_fuel_consumption(rawInput, linear);
};

const part2 = (rawInput: string) => {
    return calculate_min_fuel_consumption(rawInput, triangular);
};

run({
    part1: {
        tests: [
            {
                input: `16,1,2,0,4,2,7,1,2,14`,
                expected: 37,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `16,1,2,0,4,2,7,1,2,14`,
                expected: 168,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
