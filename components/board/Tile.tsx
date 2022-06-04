import classnames from "classnames";
import styled from "styled-components";

import { TILE_FLIP_TIME_MS } from "../../constants/settings";
import { CharStatus } from "../../utils/statuses";

const StyledTile = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  line-height: 2rem;
  font-weight: bold;
  vertical-align: middle;
  box-sizing: border-box;
  color: white;
  text-transform: uppercase;
  user-select: none;

  .cell-reveal {
    animation-duration: 0.35s;
    animation-timing-function: linear;
    animation-fill-mode: backwards;
  }
`;

interface TileProps {
  value?: string;
  status?: CharStatus;
  column?: number;
  isCompleted?: boolean;
  isRevealing?: boolean;
}

const Tile: React.FC<TileProps> = (props: TileProps) => {
  //console.log("Tile rendering...");
  //console.log(props);
  const isFilled = props.value && !props.isCompleted;
  const shouldReveal = props.isRevealing && props.isCompleted;
  const animationDelay = `${(props.column ?? 0) * TILE_FLIP_TIME_MS}ms`;

  // const classes = classnames({
  //   pop: isFilled,
  //   correct: props.status === "correct",
  //   present: props.status === "present",
  //   absent: props.status === "absent",
  //   empty: !props.status,
  // });

  const classes = classnames(props.status ?? "empty", {
    pop: isFilled,
    //"tile-reveal": shouldReveal,
    "flip-in flip-out": shouldReveal,
  });

  return (
    <StyledTile className={classes} style={{ animationDelay }}>
      {props.value}
    </StyledTile>
  );
};

export default Tile;
