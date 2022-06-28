import run from 'aocrunner';
import { getValues } from '../utils/index.js';
import Graph from 'ngraph.graph';

const parseInput = (rawInput: string) => getValues(rawInput);

// https://dev.to/codebondco/implementation-of-a-graph-javascript-4jin

const part1 = (rawInput: string) => {
    const rows = parseInput(rawInput);

    const graph = Graph();

    rows.map((row, y) => {
        row.split('').map(Number).map((value, x) => {
            graph.addNode(`${x}:${y}`, value);

            if (graph.getNode(`${x-1}:${y  }`)) graph.addLink(`${x}:${y}`, `${x-1}:${y  }`);
            if (graph.getNode(`${x-1}:${y-1}`)) graph.addLink(`${x}:${y}`, `${x-1}:${y-1}`);
            if (graph.getNode(`${x  }:${y-1}`)) graph.addLink(`${x}:${y}`, `${x  }:${y-1}`);
            if (graph.getNode(`${x+1}:${y-1}`)) graph.addLink(`${x}:${y}`, `${x+1}:${y-1}`);
            if (graph.getNode(`${x+1}:${y  }`)) graph.addLink(`${x}:${y}`, `${x+1}:${y  }`);
            if (graph.getNode(`${x+1}:${y+1}`)) graph.addLink(`${x}:${y}`, `${x+1}:${y+1}`);
            if (graph.getNode(`${x  }:${y+1}`)) graph.addLink(`${x}:${y}`, `${x  }:${y+1}`);
            if (graph.getNode(`${x-1}:${y+1}`)) graph.addLink(`${x}:${y}`, `${x-1}:${y+1}`);
        })
    });

    graph.forEachNode((node) => {
        console.log(node.id)
        graph.forEachLinkedNode(
            node.id,
            (linkedNode, link) => {
                console.log('= '+ linkedNode.id)
            },
            false,
        );
    });

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
                input: `5483143223
                        2745854711
                        5264556173
                        6141336146
                        6357385478
                        4167524645
                        2176841721
                        6882881134
                        4846848554
                        5283751526`,
                expected: 1656,
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
