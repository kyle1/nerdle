import styled from "styled-components";
import { getKeyStatuses } from "../../utils/statuses";
import Key from "./Key";

const Container = styled.div`
  margin: 10px 8px;
  user-select: none;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto 8px;
  touch-action: manipulation;
`;

const Spacer = styled.div`
  flex: 0.5;
`;

interface KeyboardProps {
  solution: string;
  guesses: string[];
  onChar: (value: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

const Keyboard: React.FC<KeyboardProps> = (props: KeyboardProps) => {
  const statuses = getKeyStatuses(props.solution, props.guesses);

  const handleKeyClick = (value: string) => {
    if (value === "ENTER") {
      props.onEnter();
    } else if (value === "BKSP") {
      props.onBackspace();
    } else {
      props.onChar(value);
    }
  };

  return (
    <Container>
      <Row>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <Key value={key} key={key} status={statuses[key]} onClick={handleKeyClick} />
        ))}
      </Row>
      <Row>
        <Spacer />
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <Key value={key} key={key} status={statuses[key]} onClick={handleKeyClick} />
        ))}
        <Spacer />
      </Row>
      <Row>
        <Key value="ENTER" onClick={handleKeyClick} />
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key value={key} key={key} status={statuses[key]} onClick={handleKeyClick} />
        ))}
        <Key value="BKSP" onClick={handleKeyClick} />
      </Row>
    </Container>
  );
};

export default Keyboard;
