export interface PuzzleResult {
  id?: number;
  puzzleId: number;
  userId: number;
  startTime: Date;
  endTime: Date;
  guessCount: number;
  isWin: boolean;
}
