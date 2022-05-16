import { useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";

import Board from "../components/board/Board";
import Keyboard from "../components/keyboard/Keyboard";
import { MAX_GUESSES, TILE_FLIP_TIME_MS } from "../constants/settings";

const solution = "FROST"; //for testing

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: calc(100% - 50px); //TODO: Put header height variable here
  display: flex;
  flex-direction: column;
`;

const Home: NextPage = () => {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [isRevealing, setIsRevealing] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [isGameLost, setIsGameLost] = useState<boolean>(false);
  const [showGameOverModal, setShowGameOverModal] = useState<boolean>(false);

  const handleChar = (value: string) => {
    if (isGameWon || isGameLost) return;

    if (currentGuess.length < solution.length) {
      setCurrentGuess(currentGuess + value);
    }
  };

  const handleEnter = () => {
    if (isGameWon || isGameLost) return;

    //TODO: Check if user's input is a valid word in word list.
    if (currentGuess.length === solution.length) {
      submitGuess();
    }
  };

  const handleBackspace = () => {
    if (isGameWon || isGameLost) return;

    if (currentGuess.length > 0) {
      let updatedGuess = currentGuess.slice(0, -1);
      setCurrentGuess(updatedGuess);
    }
  };

  const submitGuess = () => {
    console.log(guesses);
    console.log(`Submitting guess ${currentGuess}...`);

    setIsRevealing(true);

    setTimeout(() => setIsRevealing(false), TILE_FLIP_TIME_MS * solution.length);

    setGuesses([...guesses, currentGuess]);
    setCurrentGuess("");
    if (currentGuess === solution) {
      setIsGameWon(true);
      setShowGameOverModal(true);
    } else if (guesses.length === MAX_GUESSES - 1) {
      setIsGameLost(true);
      setShowGameOverModal(true);
    }
  };

  return (
    <Container>
      <Board solution={solution} guesses={guesses} currentGuess={currentGuess} isRevealing={isRevealing} />
      <Keyboard
        solution={solution}
        guesses={guesses}
        onChar={handleChar}
        onEnter={handleEnter}
        onBackspace={handleBackspace}
      />
    </Container>
  );
};

export default Home;
