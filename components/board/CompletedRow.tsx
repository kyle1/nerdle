import StyledRow from "./StyledRow";
import Tile from "./Tile";

interface CompletedRowProps {
  solution: string;
  guess: string;
}

const CompletedRow: React.FC<CompletedRowProps> = (props: CompletedRowProps) => {
  return (
    <StyledRow>
      {props.guess.split("").map((letter, i) => (
        <Tile key={i} value={letter} />
      ))}
    </StyledRow>
  );
};

export default CompletedRow;
