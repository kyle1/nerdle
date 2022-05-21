import { PuzzleGuess } from "./PuzzleGuess";
import { PuzzleResult } from "./PuzzleResult";

export interface Puzzle {
  id: number;
  puzzleDate: Date;
  word: string;

  guesses: PuzzleGuess[];
  results: PuzzleResult[];
}
