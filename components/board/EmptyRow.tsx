import StyledRow from "./StyledRow";
import Tile from "./Tile";

interface EmptyRowProps {
  length: number;
}

const EmptyRow: React.FC<EmptyRowProps> = (props: EmptyRowProps) => {
  const emptyTiles = Array.from(Array(props.length));

  return (
    <StyledRow>
      {emptyTiles.map((_, i) => (
        <Tile key={i} />
      ))}
    </StyledRow>
  );
};

export default EmptyRow;
