import styled from "styled-components";

const StyledKey = styled.button`
  font-family: inherit;
  font-weight: bold;
  border: 0;
  padding: 0;
  margin: 0 6px 0 0;
  height: 58px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  background-color: #818384;
  color: #ffffff;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
`;

interface KeyProps {
  value: string;
  onClick: (value: string) => void;
}

const Key: React.FC<KeyProps> = (props: KeyProps) => {
  const handleClick = () => {
    props.onClick(props.value);
  };

  return <StyledKey onClick={handleClick}>{props.value}</StyledKey>;
};

export default Key;
