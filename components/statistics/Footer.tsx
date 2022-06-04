import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const CountdownContainer = styled.div`
  border-right: 1px solid white;
  padding-right: 12px;
  width: 50%;
`;

const TimerContainer = styled.div`
  flex: 1;
`;

const TimerSubcontiner = styled.div`
  font-variant-numeric: initial;
  font-size: 36px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.05em;
`;

interface FooterProps {}

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  return (
    <Container>
      <CountdownContainer>
        <h1>Next WORDLE</h1>
        <TimerContainer>
          <TimerSubcontiner>00:19:32</TimerSubcontiner>
        </TimerContainer>
      </CountdownContainer>
    </Container>
  );
};

export default Footer;
