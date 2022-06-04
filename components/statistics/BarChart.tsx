import Enumerable from "linq";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MAX_GUESSES } from "../../constants/settings";
import { PuzzleResult } from "../../models/PuzzleResult";
import { ResultCount } from "./Stats";

const Container = styled.div`
  width: 80%;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
  //font-weight: 700;
`;

interface BarProps {
  width: number;
}

const Bar = styled.div`
  display: flex;
  margin-left: 5px;
  height: 20px;

  background-color: #538d4e;
  padding-right: 10px;
  width: ${(props: BarProps) => (props.width !== 0 ? props.width : 5)}%;
  justify-content: ${(props: BarProps) => (props.width !== 0 ? "end" : "center")};
  font-weight: 700;
`;

interface BarChartProps {
  results: PuzzleResult[];
}

const BarChart: React.FC<BarChartProps> = (props: BarChartProps) => {
  const [resultCounts, setResultCounts] = useState<ResultCount[]>([]);

  // const getResultCounts = (results: PuzzleResult[]): ResultCount[] => {
  //   let counts: ResultCount[] = Enumerable.from(results)
  //     .groupBy(
  //       (r) => r.guessCount,
  //       (r) => r,
  //       (key: any, group: any): ResultCount => ({
  //         guesses: key,
  //         occurrences: group.count(),
  //         percent: (group.count() / results.length) * 100,
  //       })
  //     )
  //     .orderBy((r) => r.guesses)
  //     .toArray();

  //   let maxPercent = Math.max(...counts.map((c) => c.percent));

  //   counts = counts.map((c) => ({
  //     ...c,
  //     adjustedPercent: (c.percent / maxPercent) * 100,
  //   }));

  //   return counts;
  // };

  const getResultCounts = (results: PuzzleResult[]): ResultCount[] => {
    let resultsEnumerable = Enumerable.from(results);

    let counts = [];

    for (var i = 1; i <= MAX_GUESSES; i++) {
      const resultCount: ResultCount = {
        guesses: i,
        occurrences: resultsEnumerable.where((r) => r.guessCount === i).count(),
        percent: resultsEnumerable.where((r) => r.guessCount === i).count() / i,
      };
      counts.push(resultCount);
    }

    let maxPercent = Math.max(...counts.map((c) => c.percent));

    counts = counts.map((c) => ({
      ...c,
      adjustedPercent: (c.percent / maxPercent) * 100,
    }));

    return counts;
  };

  useEffect(() => {
    const counts = getResultCounts(props.results);
    setResultCounts(counts);
  }, [props.results]);

  return (
    <Container>
      {resultCounts.map((r) => (
        <RowContainer key={r.guesses}>
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
