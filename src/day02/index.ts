import run from "aocrunner"

enum selectionScores {
  X = 1,
  Y = 2,
  Z = 3,
}

enum OutcomeScores {
  LOSS = 0,
  DRAW = 3,
  WIN = 6,
}

enum RoundResultNeeded {
  LOSS = "X",
  DRAW = "Y",
  WIN = "Z",
}

const outcomeScores = [OutcomeScores.DRAW, OutcomeScores.LOSS, OutcomeScores.WIN]

const opponentOptions = ["B", "A", "C"] as const // Paper, Rock, Scissors
const playerOptions = ["Y", "X", "Z"] as const // Paper, Rock, Scissors

type OpponentChoice = typeof opponentOptions[number]
type PlayerChoice = typeof playerOptions[number]

const getScore = (opponentChoice: OpponentChoice, playerChoice: PlayerChoice) => {
  const index1 = opponentOptions.indexOf(opponentChoice) // scissors => 2
  const index2 = playerOptions.indexOf(playerChoice) // rock => 1
  let dif = index2 - index1 // 1 - 2 => -1
  if (dif < 0) {
    // -1 < 0 => truthy
    dif += opponentOptions.length // -1 + 3 => 2 => player wins
  }
  return selectionScores[playerChoice] + outcomeScores[dif]
}

const findPlayerChoice = (opponentChoice: OpponentChoice, roundResult: RoundResultNeeded) => {
  const opponentChoiceIdx = opponentOptions.indexOf(opponentChoice)
  let playerChoice: PlayerChoice = playerOptions[opponentChoiceIdx]
  if (roundResult === RoundResultNeeded.WIN) {
    playerChoice = playerOptions[opponentChoiceIdx - 1] || playerOptions[playerOptions.length - 1]
  }
  if (roundResult === RoundResultNeeded.LOSS) {
    playerChoice = playerOptions[opponentChoiceIdx + 1] || playerOptions[0]
  }

  return playerChoice
}

const parseInput = (rawInput: string) => rawInput.split("\n").map((pairOfChoices) => pairOfChoices.split(" "))

const part1 = (rawInput: string) => {
  const rounds = parseInput(rawInput) as [OpponentChoice, PlayerChoice][]
  return rounds.reduce((acc, pairOfChoices) => acc + getScore(...pairOfChoices), 0)
}

const part2 = (rawInput: string) => {
  const rounds = parseInput(rawInput) as [OpponentChoice, RoundResultNeeded][]
  return rounds.reduce((acc, roundInputs) => {
    const [opponentChoice, outcomeNeeded] = roundInputs
    return acc + getScore(opponentChoice, findPlayerChoice(opponentChoice, outcomeNeeded))
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
