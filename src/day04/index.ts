import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map((line) => line.split(/[-,]/g).map((it) => Number(it)))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.reduce((acc, sections) => {
    const [elfOneStart, elfOneEnd, elfTwoStart, elfTwoEnd] = sections

    if (
      (elfTwoStart <= elfOneStart && elfTwoEnd >= elfOneEnd) ||
      (elfTwoStart >= elfOneStart && elfTwoEnd <= elfOneEnd)
    ) {
      acc += 1
    }
    return acc
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.reduce((acc, sections) => {
    const [elfOneStart, elfOneEnd, elfTwoStart, elfTwoEnd] = sections

    if (elfOneEnd < elfTwoStart || elfTwoEnd < elfOneStart) {
      return acc
    }

    acc += 1
    return acc
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `
          2-4,6-8
          2-3,4-5
          5-7,7-9
          2-8,3-7
          6-6,4-6
          2-6,4-8
          2-9,4-8
          2-2,2-8
          2-6,1-8
        `,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          2-4,6-8
          2-3,4-5
          5-7,7-9
          2-8,3-7
          6-6,4-6
          2-6,4-8
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
