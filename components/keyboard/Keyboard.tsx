import styled from "styled-components";
import Key from "./Key";

const Container = styled.div`
  margin: 0 8px;
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
  onChar: (value: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

const Keyboard: React.FC<KeyboardProps> = (props: KeyboardProps) => {
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
          <Key value={key} key={key} onClick={handleKeyClick} />
        ))}
      </Row>
      <Row>
        <Spacer />
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <Key value={key} key={key} onClick={handleKeyClick} />
        ))}
        <Spacer />
      </Row>
      <Row>
        <Key value="ENTER" onClick={handleKeyClick} />
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <Key value={key} key={key} onClick={handleKeyClick} />
        ))}
        <Key value="BKSP" onClick={handleKeyClick} />
      </Row>
    </Container>
  );
};

export default Keyboard;
