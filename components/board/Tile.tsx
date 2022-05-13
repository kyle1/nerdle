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
  isRevealing?: boolean;
}

const Tile: React.FC<TileProps> = (props: TileProps) => {
  const flipDelay = `${props.column ?? 0 * TILE_FLIP_TIME_MS}ms`;
  // const classes = status

  // return <StyledTile className={props.isRevealing ? "cell-reveal" : ""}>{props.value}</StyledTile>;
  return <StyledTile className={props.status ?? "empty"}>{props.value}</StyledTile>;
};

export default Tile;
