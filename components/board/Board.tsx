import styled from "styled-components";

import { MAX_GUESSES } from "../../constants/settings";
import CompletedRow from "./CompletedRow";
import CurrentRow from "./CurrentRow";
import EmptyRow from "./EmptyRow";

const Container = styled.div`
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  overflow: hidden;
`;

const StyledBoard = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 5px;
  padding: 10px;
  box-sizing: border-box;

  width: 300px; //TODO: make dynamic
  height: 360px; //TODO: make dynamic
`;

interface BoardProps {
  solution: string;
  guesses: string[];
  currentGuess: string;
  isRevealing: boolean;
}

const Board: React.FC<BoardProps> = (props: BoardProps) => {
  const emptyRows =
    props.guesses.length < MAX_GUESSES - 1
      ? Array.from(Array(MAX_GUESSES - 1 - props.guesses.length))
      : [];

  return (
    <Container>
      <StyledBoard>
        {props.guesses.map((guess, i) => (
          <CompletedRow
            key={i}
            solution={props.solution}
            guess={guess}
            isRevealing={props.isRevealing}
          />
        ))}
        {props.guesses.length < MAX_GUESSES && (
          <CurrentRow length={props.solution.length} guess={props.currentGuess} />
        )}
        {emptyRows.map((_, i) => (
          <EmptyRow key={i} length={props.solution.length} />
        ))}
      </StyledBoard>
    </Container>
  );
};

export default Board;
