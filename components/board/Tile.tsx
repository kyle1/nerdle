import styled from "styled-components";

const StyledTile = styled.div`
  ///TODO: Change color for tiles that are correct/present
  border: 2px solid #3a3a3c;

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
`;

interface TileProps {
  value?: string;
}

const Tile: React.FC<TileProps> = (props: TileProps) => {
  return <StyledTile>{props.value}</StyledTile>;
};

export default Tile;
