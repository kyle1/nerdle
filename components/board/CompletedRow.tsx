import { getTileStatuses } from "../../utils/statuses";
import StyledRow from "./StyledRow";
import Tile from "./Tile";

interface CompletedRowProps {
  solution: string;
  guess: string;
  isRevealing: boolean;
}

const CompletedRow: React.FC<CompletedRowProps> = (props: CompletedRowProps) => {
  console.log("CompletedRow rendering...");
  console.log(props);
  const statuses = getTileStatuses(props.solution, props.guess);

  return (
    <StyledRow>
      {props.guess.split("").map((letter, i) => (
        <Tile
          key={i}
          value={letter}
          status={statuses[i]}
          column={i}
          isRevealing={props.isRevealing}
          isCompleted
        />
      ))}
    </StyledRow>
  );
};

export default CompletedRow;
