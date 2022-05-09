import StyledRow from "./StyledRow";
import Tile from "./Tile";

interface CurrentRowProps {
  length: number;
  guess: string;
}

const CurrentRow: React.FC<CurrentRowProps> = (props: CurrentRowProps) => {
  const emptyTiles = Array.from(Array(props.length - props.guess.length));

  return (
    <StyledRow>
      {props.guess.split("").map((letter, i) => (
        <Tile key={i} value={letter} />
      ))}
      {emptyTiles.map((_, i) => (
        <Tile key={i} />
      ))}
    </StyledRow>
  );
};

export default CurrentRow;
