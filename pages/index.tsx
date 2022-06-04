import { useEffect, useState } from "react";
import dayjs from "dayjs";
import type { NextPage } from "next";
import styled from "styled-components";

import Board from "../components/board/Board";
import Keyboard from "../components/keyboard/Keyboard";
import { API_BASE_URL } from "../constants/apiBaseUrl";
import { MAX_GUESSES, TILE_FLIP_TIME_MS } from "../constants/settings";
import { Puzzle } from "../models/Puzzle";
import { PuzzleGuess } from "../models/PuzzleGuess";
import { PuzzleResult } from "../models/PuzzleResult";
import Modal from "../components/Modal";
import GameOver from "../components/GameOver";

let allowedGuesses: string[];

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: calc(100% - 50px); //TODO: Put header height variable here
  display: flex;
  flex-direction: column;
`;

const Home: NextPage = () => {
  const [solution, setSolution] = useState<string | null>(null);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isRevealing, setIsRevealing] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [isGameLost, setIsGameLost] = useState<boolean>(false);
  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);

  const handleChar = (value: string) => {
    if (isGameWon || isGameLost) return;

    if (currentGuess.length < solution!.length) {
      setCurrentGuess(currentGuess + value);
    }
  };

  const handleEnter = () => {
    if (isGameWon || isGameLost) return;

    //TODO: Check if user's input is a valid word in word list.
    if (currentGuess.length !== solution!.length) {
      //TODO: notify user?
      return;
    }

    console.log(allowedGuesses.length);
    console.log(allowedGuesses);

    if (!allowedGuesses.includes(currentGuess.toLowerCase())) {
      //TODO: notify user that word is invalid
      console.log(`${currentGuess} is not a valid word`);
      return;
    }

    submitGuess();
  };

  const handleBackspace = () => {
    if (isGameWon || isGameLost) return;

    if (currentGuess.length > 0) {
      let updatedGuess = currentGuess.slice(0, -1);
      setCurrentGuess(updatedGuess);
    }
  };

  const submitGuess = () => {
    setIsRevealing(true);

    setTimeout(() => setIsRevealing(false), TILE_FLIP_TIME_MS * solution!.length);

    setGuesses([...guesses, currentGuess]);

    const isMatch = currentGuess === solution;

    saveGuess(currentGuess, isMatch);

    setCurrentGuess("");

    if (isMatch) {
      saveResult(true);
      setIsGameWon(true);
      setShowGameOverModal(true);
    } else if (guesses.length === MAX_GUESSES - 1) {
      saveResult(false);
      setIsGameLost(true);
      setShowGameOverModal(true);
    }
  };

  const getTodaysWord = () => {
    let date = dayjs().format("YYYY-MM-DD");
    // let url: string = `${API_BASE_URL}/puzzles/date/${date}`;
    let url: string = `${API_BASE_URL}/puzzles/date/2022-05-17`;
    fetch(url)
      .then((response) => response.json())
      .then(
        (puzzle: Puzzle) => displayPuzzle(puzzle),
        (error) => console.log(error)
      );
  };

  const displayPuzzle = (puzzle: Puzzle) => {
    setSolution(puzzle.word);

    if (puzzle.guesses.length > 0) {
      const guesses = puzzle.guesses.map((g) => g.word);
      setGuesses(guesses);
    }

    if (puzzle.results.length > 0) {
      const won = puzzle.results[0].isWin;
      if (won) {
        setIsGameWon(true);
      } else {
        setIsGameLost(true);
      }
      setShowGameOverModal(true);
    }
  };

  const saveGuess = (word: string, isMatch: boolean) => {
    const guess: PuzzleGuess = {
      //id: 0,
      puzzleId: 1, //todo
      userId: 1, //todo
      word: word,
      guessNumber: guesses.length + 1,
      isMatch: isMatch,
    };
    let url: string = `${API_BASE_URL}/puzzles/guess`;
    let options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(guess),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then(
        () => {},
        (error) => console.log(error)
      );
  };

  const saveResult = (isWin: boolean) => {
    const result: PuzzleResult = {
      //id: 0,
      puzzleId: 1, //todo
      userId: 1, //todo
      startTime: new Date(), //todo
      endTime: new Date(), //todo
      guessCount: guesses.length + 1,
      isWin: isWin,
    };
    let url: string = `${API_BASE_URL}/puzzles/result`;
    let options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
    fetch(url, options)
      .then((response) => response.json())
      .then(
        () => {},
        (error) => console.log(error)
      );
  };

  useEffect(() => {
    getTodaysWord();

    fetch("/valid-words.txt")
      .then((f) => f.text())
      .then((text) => (allowedGuesses = text.split("\n")));
  }, []);

  return (
    <Container>
      {solution && (
        <>
          {showGameOverModal && (
            <Modal
              onConfirm={() => console.log("confirmed")}
              onClose={() => setShowGameOverModal(false)}
            >
              <GameOver solution={solution} isWin={isGameWon} />
            </Modal>
          )}
          <Board
            solution={solution!}
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
          />
          <Keyboard
            solution={solution!}
            guesses={guesses}
            onChar={handleChar}
            onEnter={handleEnter}
            onBackspace={handleBackspace}
          />
        </>
      )}
    </Container>
  );
};

export default Home;
