import { useState } from "react";
import type { NextPage } from "next";
import styled from "styled-components";

import Board from "../components/board/Board";
import Keyboard from "../components/keyboard/Keyboard";

const solution = "frost"; //for testing

const Title = styled.div`
  font-family: "nyt-karnakcondensed";
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

  const handleChar = (value: string) => {
    if (currentGuess.length < solution.length) {
      setCurrentGuess(currentGuess + value);
    }
  };

  const handleEnter = () => {
    if (currentGuess.length === solution.length) {
      submitGuess();
    }
  };

  const handleBackspace = () => {
    if (currentGuess.length > 0) {
      let updatedGuess = currentGuess.slice(0, -1);
      setCurrentGuess(updatedGuess);
    }
  };

  const submitGuess = () => {
    console.log(`Submitting guess ${currentGuess}...`);
    let updatedGuesses = [...guesses, currentGuess];
    setGuesses(updatedGuesses);
    setCurrentGuess("");
  };

  return (
    <div>
      <Title>Wordle</Title>
      <Container>
        <Board solution={solution} guesses={guesses} currentGuess={currentGuess} />
        <Keyboard onChar={handleChar} onEnter={handleEnter} onBackspace={handleBackspace} />
      </Container>
    </div>
  );
};

export default Home;
