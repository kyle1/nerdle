export type CharStatus = "absent" | "present" | "correct";

export const getTileStatuses = (solution: string, guess: string): CharStatus[] => {
  const solutionSplit = solution.split("");
  const guessSplit = guess.split("");
  const statuses: CharStatus[] = [];
  guessSplit.forEach((letter, i) => {
    if (letter === solutionSplit[i]) {
      statuses[i] = "correct";
    } else if (solutionSplit.includes(letter)) {
      statuses[i] = "present";
    } else {
      statuses[i] = "absent";
    }
  });
  return statuses;
};

export const getKeyStatuses = (
  solution: string,
  guesses: string[]
): { [letter: string]: CharStatus } => {
  const obj: { [letter: string]: CharStatus } = {};
  const solutionSplit = solution.split("");

  guesses.forEach((guess) => {
    const guessSplit = guess.split("");
    guessSplit.forEach((letter, i) => {
      if (!solutionSplit.includes(letter)) {
        return (obj[letter] = "absent");
      }

      if (solutionSplit[i] === letter) {
        return (obj[letter] = "correct");
      }

      if (obj[letter] !== "correct") {
        return (obj[letter] = "present");
      }
    });
  });

  return obj;
};
