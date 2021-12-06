import run from 'aocrunner';
import { getValues, Matrix, Line, Point } from '../utils/index.js';

const maxCoordinates = { x: 0, y: 0 };

const parseInput = (rawInput: string) => {
    const vents = getValues(rawInput);

    const regexp = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/;
    const ventLines: Line[] = [];

    for (const vent of vents) {
        const match: { x1: string; y1: string; x2: string; y2: string } = vent.match(regexp)?.groups as any;

        const ventLine = new Line({ x: +match.x1, y: +match.y1 }, { x: +match.x2, y: +match.y2 });
        ventLines.push(ventLine);

        maxCoordinates.x = Math.max(maxCoordinates.x, +ventLine.start.x, +ventLine.end.x);
        maxCoordinates.y = Math.max(maxCoordinates.y, +ventLine.start.y, +ventLine.end.y);
    }

    return ventLines;
};

const part1 = (rawInput: string) => {
    const ventLines = parseInput(rawInput);

    const ventsMatrix = new Matrix(maxCoordinates.y, maxCoordinates.x);
    for (const ventLine of ventLines) {
        if (ventLine.start.x === ventLine.end.x || ventLine.start.y === ventLine.end.y) {
            ventsMatrix.addLine(ventLine);
        }
    }

    // ventsMatrix.print();

    const atLeastTwoVents = ventsMatrix.values.flat().filter((value) => value > 1).length;
    return atLeastTwoVents;
};

const part2 = (rawInput: string) => {
    const ventLines = parseInput(rawInput);

    const ventsMatrix = new Matrix(maxCoordinates.y, maxCoordinates.x);
    for (const ventLine of ventLines) {
        ventsMatrix.addLine(ventLine);
    }

    // ventsMatrix.print();

    const atLeastTwoVents = ventsMatrix.values.flat().filter((value) => value > 1).length;
    return atLeastTwoVents;
};

run({
    part1: {
        tests: [
            {
                input: `0,9 -> 5,9
                        8,0 -> 0,8
                        9,4 -> 3,4
                        2,2 -> 2,1
                        7,0 -> 7,4
                        6,4 -> 2,0
                        0,9 -> 2,9
                        3,4 -> 1,4
                        0,0 -> 8,8
                        5,5 -> 8,2`,
                expected: 5,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `0,9 -> 5,9
                        8,0 -> 0,8
                        9,4 -> 3,4
                        2,2 -> 2,1
                        7,0 -> 7,4
                        6,4 -> 2,0
                        0,9 -> 2,9
                        3,4 -> 1,4
                        0,0 -> 8,8
                        5,5 -> 8,2`,
                expected: 12,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
