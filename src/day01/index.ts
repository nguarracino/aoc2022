import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n").map(Number)

const sum = (arr: number[]) => arr.reduce((previous, current) => previous + current, 0);

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    let max = 0;
    let index = 0;
    while (1) {
        index = input.findIndex((value) => value === undefined || value === 0);
        if (index === -1) {
            break;
        }

        let elf = sum(input.splice(0, index));
        if (elf > max) {
            max = elf;
        }
        input.shift();
    }
    return max;
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    let max = [0, 0, 0]
    let index = 0;
    while (1) {
        index = input.findIndex((value) => value === undefined || value === 0);
        if (index === -1) {
            break;
        }

        let elf = sum(input.splice(0, index));
        if (elf > max[0]) {
            max[0] = elf;
            max.sort()
        }
        input.shift();
    }
    return sum(max)
};

run({
    part1: {
        tests: [
            // {
            //   input: ``,
            //   expected: "",
            // },
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
    onlyTests: false,
});
