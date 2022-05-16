import Link from "next/link";
import { FaChartBar, FaCog, FaRegQuestionCircle, FaUser } from "react-icons/fa";
import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 0px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 0 16px;
  height: 50px;
  color: #ffffff;
  border-bottom: 1px solid #3a3a3c;
`;

const Title = styled.div`
  margin: 10px;
  font-weight: 700;
  font-size: 35px;
  line-height: 100%;
  letter-spacing: 0.01em;
  text-align: center;
  left: 0;
  right: 0;
`;

const MenuLeft = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
  width: 70px;
  justify-content: flex-start;
`;

const MenuRight = styled.div`
  display: flex;
  width: 70px;
  justify-content: flex-end;
`;

const IconContainer = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  font-size: 22px;
`;

interface NavBarProps {
  onInstructionsClick: () => void;
  onStatsClick: () => void;
  onSettingsClick: () => void;
}

const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => (
  <StyledHeader>
    <MenuLeft>
      <IconContainer>
        <FaRegQuestionCircle onClick={() => props.onInstructionsClick()} />
      </IconContainer>
      <IconContainer onClick={() => props.onSettingsClick()}>
        <FaCog />
      </IconContainer>
    </MenuLeft>
    <Link href="/">
      <Title>Nerdle</Title>
    </Link>
    <MenuRight>
      <IconContainer>
        <FaChartBar onClick={() => props.onStatsClick()} />
      </IconContainer>
      <Link href="/login">
        <IconContainer>
          <FaUser />
        </IconContainer>
      </Link>
    </MenuRight>
  </StyledHeader>
);

export default NavBar;
