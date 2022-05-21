import styled from "styled-components";
import { ResultCount } from "./Stats";

const Container = styled.div`
  margin: 20px;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  font-weight: 700;
`;

interface BarProps {
  width: number;
}

const Bar = styled.div`
  //margin-top: 10px;
  margin-left: 5px;
  height: 20px;
  width: ${(props: BarProps) => props.width}%;
  background-color: #538d4e;

  padding-right: 10px;
  text-align: right;
  /* font-weight: 700; */
`;

interface BarChartProps {
  resultCounts: ResultCount[];
}

const BarChart: React.FC<BarChartProps> = (props: BarChartProps) => {
  console.log("BarChart rendering...");
  console.log(props);
  return (
    <Container>
      <div>Guess Distribution</div>
      {props.resultCounts.map((r) => (
        <RowContainer>
          {r.guesses}
          <Bar key={r.guesses} width={r.adjustedPercent!}>
            {r.occurrences}
          </Bar>
        </RowContainer>
      ))}
    </Container>
  );
};

export default BarChart;
