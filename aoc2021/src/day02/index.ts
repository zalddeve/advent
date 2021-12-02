import run from 'aocrunner';

const parseInput = (rawInput: string): Command[] => {
    return rawInput
        .split('\n')
        .map((line) => line.trim())
        .map((line) => {
            const lineArr = line.split(' ');
            return {
                direction: lineArr[0] === 'forward' ? 'x' : 'y',
                value: lineArr[0] === 'up' ? -parseInt(lineArr[1]) : parseInt(lineArr[1]),
                aim: lineArr[0] === 'up' ? -parseInt(lineArr[1]) : lineArr[0] === 'down' ? parseInt(lineArr[1]) : 0,
            };
        });
};

interface Position {
    x: number;
    y: number;
    aim: number;
}
interface Command {
    direction: 'x' | 'y';
    value: number;
    aim: number;
}

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);
    const position: Position = {
        x: 0,
        y: 0,
        aim: 0,
    };

    input.map((command: Command) => {
        position[command.direction] += command.value;
    });

    return position.x * position.y;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    const position: Position = {
        x: 0,
        y: 0,
        aim: 0,
    };

    input.map((command: Command) => {
        if (command.direction === 'x') {
            position[command.direction] += command.value;
            position['y'] += position.aim * command.value;
        } else {
            position.aim += command.aim;
        }
    });

    return position.x * position.y;
};

run({
    part1: {
        tests: [
            {
                input: `forward 5
                        down 5
                        forward 8
                        up 3
                        down 8
                        forward 2`,
                expected: 150,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `forward 5
                        down 5
                        forward 8
                        up 3
                        down 8
                        forward 2`,
                expected: 900,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
});
