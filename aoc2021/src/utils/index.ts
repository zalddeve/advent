/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */

export function getLines(rawInput: string) {
    return rawInput
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line);
}

export class Matrix {
    rows: number;
    columns: number;
    values: number[][];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.values = new Array<number[]>(columns + 1).fill([]).map(() => new Array<number>(rows + 1).fill(0));
    }

    addLine(line: Line) {
        const start = line.start;
        const end = line.end;

        const diff: Point = {
            x: Math.abs(end.x - start.x),
            y: Math.abs(end.y - start.y),
        };
        const slope: Point = {
            x: start.x < end.x ? 1 : -1,
            y: start.y < end.y ? 1 : -1,
        };
        let error = diff.x - diff.y;
        let x = start.x;
        let y = start.y;

        while (true) {
            this.values[x][y] += line.value;
            if (x === end.x && y === end.y) break;

            var e2 = 2 * error;
            if (e2 > -diff.y) {
                error -= diff.y;
                x += slope.x;
            }
            if (e2 < diff.x) {
                error += diff.x;
                y += slope.y;
            }
        }
    }

    print() {
        console.table(this.transpose().values);
    }

    rotate(angle: 'left' | 'right'): Matrix {
        const rotated = new Matrix(this.columns, this.rows);
        const a = this.values;  // TODO: deep copy

        if (angle == 'left') {
            var n = a.length;
            for (var i = 0; i < n / 2; i++) {
                for (var j = i; j < n - i - 1; j++) {
                    var tmp = a[i][j];
                    a[i][j] = a[j][n - i - 1];
                    a[j][n - i - 1] = a[n - i - 1][n - j - 1];
                    a[n - i - 1][n - j - 1] = a[n - j - 1][i];
                    a[n - j - 1][i] = tmp;
                }
            }
            rotated.values = a;
        }
        if (angle == 'right') {
            var n = a.length;
            for (var i = 0; i < n / 2; i++) {
                for (var j = i; j < n - i - 1; j++) {
                    var tmp = a[i][j];
                    a[i][j] = a[n - j - 1][i];
                    a[n - j - 1][i] = a[n - i - 1][n - j - 1];
                    a[n - i - 1][n - j - 1] = a[j][n - i - 1];
                    a[j][n - i - 1] = tmp;
                }
            }
            rotated.values = a;
        }

        return rotated;
    }

    transpose(): Matrix {
        const transposed = new Matrix(this.columns, this.rows);
        const a = this.values;
        transposed.values = a[0].map(function (_, c) { return a.map(function (r) { return r[c]; }); });
        return transposed;
    }
}

export class Point {
    constructor(readonly x: number, readonly y: number) {}
}

export class Line {
    constructor(readonly start: Point, readonly end: Point, readonly value: number = 1) {}
}
