import { useEffect, useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";

import Board from "../components/board/Board";
import Keyboard from "../components/keyboard/Keyboard";
import { MAX_GUESSES, TILE_FLIP_TIME_MS } from "../constants/settings";
import Modal from "../components/Modal";

const solution = "FROST"; //for testing

const Title = styled.div`
  margin: 10px;
  //font-family: "nyt-karnakcondensed";
  font-weight: 700;
  font-size: 37px;
  line-height: 100%;
  letter-spacing: 0.01em;
  text-align: center;
  left: 0;
  right: 0;
  pointer-events: none;
`;

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
      console.log("u win");
      setIsGameWon(true);
      setShowGameOverModal(true);
    } else if (guesses.length === MAX_GUESSES - 1) {
      console.log("u lose");
      setIsGameLost(true);
      setShowGameOverModal(true);
    }
  };

  return (
    <div>
      {showGameOverModal && (
        <Modal
          onConfirm={() => console.log("confirmed")}
          onClose={() => setShowGameOverModal(false)}
        >
          <div>You {isGameWon ? "won!" : "lost!"}</div>
        </Modal>
      )}
      <Title>Nerdle</Title>
      <Container>
        <Board
          solution={solution}
          guesses={guesses}
          currentGuess={currentGuess}
          isRevealing={isRevealing}
        />
        <Keyboard
          solution={solution}
          guesses={guesses}
          onChar={handleChar}
          onEnter={handleEnter}
          onBackspace={handleBackspace}
        />
      </Container>
    </div>
  );
};

export default Home;
