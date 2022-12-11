import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split(/\n\s*\n/)

const sumSublist = (sublist: string) =>
  sublist.split("\n").reduce((acc, sublistItem) => acc + Number(sublistItem), 0)

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.reduce((acc, sublist) => {
    const sublistSum: number = sublist
      .split("\n")
      .reduce((acc, sublistItem) => acc + Number(sublistItem), 0)
    return acc > sublistSum ? acc : sublistSum
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const allSums = input.map((sublist) => sumSublist(sublist))
  return allSums
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, val) => acc + val)
}

run({
  part1: {
    tests: [
      {
        input: `
          1
          2

          1
          2
          3

          4
          5
        `,
        expected: 9,
      },
      {
        input: `
          0

          0
          1
          0

          1
          1
        `,
        expected: 2,
      },
      {
        input: `
          0

          0
        `,
        expected: 0,
      },
      {
        input: ``,
        expected: 0,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          1
          2

          1
          2
          3
        `,
        expected: 9,
      },
      {
        input: `
          1
          2

          1
          2
          3

          4
          5

          5
          5
        `,
        expected: 25,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
