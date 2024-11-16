import { WORDS } from '../constants/wordlist'
import { getGuessStatuses } from './statuses'

export const isWordInWordList = (word: string) => {
  for (let w of WORDS) {
    if ((w.length > 4 && w.substring(0, 4) === word.toLowerCase())
        || (w.length === 4 && w === word.toLowerCase())
        || (w.length === 3 && (w + ' ') === word.toLowerCase())
      ) {
      return true;
    }
  }
  return false;
}

export const isWinningWord = (word: string) => {
  return solution.substring(0, 4) === word || solution === word.trim();
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  const knownLetterSet = new Set<string>()
  for (const guess of guesses) {
    const statuses = getGuessStatuses(guess)

    for (let i = 0; i < guess.length; i++) {
      if (statuses[i] === 'correct' || statuses[i] === 'present') {
        knownLetterSet.add(guess[i])
      }
      if (statuses[i] === 'correct' && word[i] !== guess[i]) {
        return `Must use ${guess[i]} in position ${i + 1}`
      }
    }
  }

  for (const letter of Array.from(knownLetterSet.values())) {
    // fail fast, always return first failed letter if applicable
    if (!word.includes(letter)) {
      return `Guess must contain ${letter}`
    }
  }
  return false
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    solution: WORDS[index % WORDS.length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, solutionIndex, tomorrow } = getWordOfDay()
