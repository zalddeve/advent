import run from 'aocrunner';
import { getValues, Matrix } from '../utils/index.js';
import Graph from 'graphology';
import {bfs} from 'graphology-traversal';

const parseInput = (rawInput: string) => getValues(rawInput);

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const height_map = new Matrix(input.length, input[0].length);
    input.map((row, index) => height_map.addRow(index, row.split('').map(Number)));
    // height_map.print();

    const risk_levels = [];
    for (let y = 0; y < height_map.rows; y++) {
        for (let x = 0; x < height_map.columns; x++) {
            const actual = height_map.values[x][y];
            if (
                (height_map.at(x, y - 1) == undefined || actual < height_map.at(x, y - 1)) &&
                (height_map.at(x + 1, y) == undefined || actual < height_map.at(x + 1, y)) &&
                (height_map.at(x, y + 1) == undefined || actual < height_map.at(x, y + 1)) &&
                (height_map.at(x - 1, y) == undefined || actual < height_map.at(x - 1, y))
            ) {
                risk_levels.push(actual + 1);
            }
        }
    }
    // console.table(risk_levels);

    return risk_levels.reduce((sum, value) => (sum += value));
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const graph = new Graph({ multi: true });

    input.map((row, y) => {
        row.split('').map(Number).map((height, x) => {
            graph.addNode(`${x}:${y}`, { height });
            // console.log(`${x}:${y}`)

            if (x > 0) { graph.addEdge(`${x}:${y}`, `${x - 1}:${y}`); }
            if (y > 0) { graph.addEdge(`${x}:${y}`, `${x}:${y - 1}`); }
        })
    });

    return;
};

run({
    part1: {
        tests: [
            {
                input: `2199943210
                        3987894921
                        9856789892
                        8767896789
                        9899965678`,
                expected: 15,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `2199943210
                        3987894921
                        9856789892
                        8767896789
                        9899965678`,
                expected: 1134,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
});
