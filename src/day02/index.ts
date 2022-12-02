import run from "aocrunner";

type first = "A" | "B" | "C";
type second = "X" | "Y" | "Z";

type shapes = "rock" | "paper" | "scissors";

const normalize = (s: first | second): shapes => {
    switch (s) {
        case "A":
        case "X":
            return "rock";
        case "B":
        case "Y":
            return "paper";
        case "C":
        case "Z":
            return "scissors";
    }

    throw Error();
};

const shapeScore = (shape: second) => {
    const shapeNormalized = normalize(shape);
    return shapeNormalized === "rock" ? 1 : shapeNormalized === "paper" ? 2 : 3;
};

const outcomeScore = (first: first, second: second) => {
    const firstNormalized = normalize(first);
    const secondNormalized = normalize(second);

    if (firstNormalized === "rock") {
        return secondNormalized === "paper" ? 6 : secondNormalized === "scissors" ? 0 : 3;
    }

    if (firstNormalized === "paper") {
        return secondNormalized === "scissors" ? 6 : secondNormalized === "rock" ? 0 : 3;
    }

    if (firstNormalized === "scissors") {
        return secondNormalized === "rock" ? 6 : secondNormalized === "paper" ? 0 : 3;
    }

    throw Error();
};

const calculateMove = (first: first, second: second): first => {
    const firstNormalized = normalize(first);

    if (second === "X") {
        return firstNormalized === "rock" ? "C" : firstNormalized === "paper" ? "A" : "B"
    }

    if (second === "Y") {
        return firstNormalized === "rock" ? "A" : firstNormalized === "paper" ? "B" : "C"
    }

    if(second === "Z") {
        return firstNormalized === "rock" ? "B" : firstNormalized === "paper" ? "C" : "A"
    }

    throw Error()
}

const sum = (arr: number[]) => arr.reduce((previous, current) => previous + current, 0);

const parseInput = (rawInput: string) => {
    return rawInput.split("\n").map((value) => value.split(" ")); //.map((value) => value.map((value) => normalize(value)))
};

const part1 = (rawInput: string) => {
    const input = parseInput(rawInput);

    return sum(
        input.map((value) => {
            let [f, s] = value;
            return outcomeScore(f as first, s as second) + shapeScore(s as second);
        })
    );
};

const part2 = (rawInput: string) => {
    const input = parseInput(rawInput);

    const moves = input.map((value) => {
        let [f, s] = value
        return [f, calculateMove(f as first, s as second)]
    })

    return sum(
        moves.map((value) => {
            let [f, s] = value;
            return outcomeScore(f as first, s as second) + shapeScore(s as second);
        })
    );
};

run({
    part1: {
        tests: [
            {
                input: `A Z`,
                expected: 3,
            },
            //  {
            //    input: `A Z
            //  A Z`,
            //expected: 6
            //}
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
               input: `A Z`,
               expected: 8
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
