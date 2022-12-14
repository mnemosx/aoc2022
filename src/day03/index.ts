import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => [line.slice(0, line.length / 2), line.slice(line.length / 2)])

function findCommonChar(left: string, right: string) {
  const left_map = {} as Record<string, boolean>
  const right_map = {} as Record<string, boolean>
  let index = 0

  while (index < left.length || index < right.length) {
    // Check left string
    if (index < left.length) {
      var c = left[index]

      left_map[c] = true

      // Check if it exists in the other map
      if (right_map[c]) {
        return c
      }
    }

    // Check right string
    if (index < right.length) {
      var c = right[index]

      right_map[c] = true

      // Check if it exists in the other map
      if (left_map[c]) {
        return c
      }
    }

    index++
  }

  return ""
}

function getPriority(char: string): number {
  const isUpper = /^[A-Z]*$/.test(char)
  // remove 9 because parseInt('a', 36) returns 10; add 26 for uppercase letters
  return parseInt(char, 36) - 9 + (isUpper ? 26 : 0)
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  return input.reduce((acc, pair) => {
    const commonChar = findCommonChar(pair[0], pair[1])
    acc += getPriority(commonChar)
    return acc
  }, 0)
}

const part2 = (rawInput: string) => {
  // split input into groups of three elves aka lines
  const input = rawInput.match(/(?:.+\n?){3}/g) || []

  return input.reduce((acc, group) => {
    const threeElfGroup = group
      .split("\n")
      .filter((it) => it)
      // sort it by length and iterate the shortest to find common char quicker
      .sort((a, b) => a.length - b.length)

    const commonChar =
      threeElfGroup[0]
        .split("")
        .find((letter) => threeElfGroup[1].indexOf(letter) > -1 && threeElfGroup[2].indexOf(letter) > -1) || ""

    acc += getPriority(commonChar)
    return acc
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `
          vJrwpWtwJgWrhcsFMMfFFhFp
          jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
          PmmdzqPrVvPwwTWBwg
          wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
          ttgJtRGJQctTZtZT
          CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          vJrwpWtwJgWrhcsFMMfFFhFp
          jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
          PmmdzqPrVvPwwTWBwg
          wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
          ttgJtRGJQctTZtZT
          CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
