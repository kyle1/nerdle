import { getTileStatuses } from "../../utils/statuses";
import StyledRow from "./StyledRow";
import Tile from "./Tile";

interface CompletedRowProps {
  solution: string;
  guess: string;
  isRevealing: boolean;
}

const CompletedRow: React.FC<CompletedRowProps> = (props: CompletedRowProps) => {
  let statuses = getTileStatuses(props.solution, props.guess);

  return (
    <StyledRow>
      {props.guess.split("").map((letter, i) => (
        <Tile key={i} value={letter} isRevealing={props.isRevealing} status={statuses[i]} />
      ))}
    </StyledRow>
  );
};

export default CompletedRow;
