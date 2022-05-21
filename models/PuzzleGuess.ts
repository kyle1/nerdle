export interface PuzzleGuess {
  id?: number;
  puzzleId: number;
  userId: number;
  word: string;
  guessNumber: number;
  isMatch: boolean;
}
