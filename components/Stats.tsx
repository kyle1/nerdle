import { useEffect, useState } from "react";
import Enumerable from "linq";
import styled from "styled-components";

import { API_BASE_URL } from "../constants/apiBaseUrl";
import { PuzzleResult } from "../models/PuzzleResult";
import BarChart from "./BarChart";

const letterCount: number = 5; //for testing
const rows = Array.from(Array(letterCount));

export interface ResultCount {
  guesses: number;
  occurrences: number;
  percent: number;
  adjustedPercent?: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
`;

const Statistics = styled.div`
  display: flex;
  padding-bottom: 01px;
`;

const StatContainer = styled.div`
  flex: 1;

  .stat {
    font-size: 36px;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.05em;
    font-variant-numeric: proportional-nums;
  }

  .label {
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

interface StatsProps {}

const Stats: React.FC<StatsProps> = (props: StatsProps) => {
  const [resultCounts, setResultCounts] = useState<ResultCount[]>([]);

  const getResults = (userId: number) => {
    let url: string = `${API_BASE_URL}/users/${userId}/results`;
    fetch(url)
      .then((response) => response.json())
      .then(
        (results: PuzzleResult[]) => {
          let counts: ResultCount[] = Enumerable.from(results)
            .groupBy(
              (r) => r.guessCount,
              (r) => r,
              (key: any, group: any): ResultCount => ({
                guesses: key,
                occurrences: group.count(),
                percent: (group.count() / results.length) * 100,
              })
            )
            .orderBy((r) => r.guesses)
            .toArray();
          let maxPercent = Math.max(...counts.map((c) => c.percent));
          counts = counts.map((c) => ({
            ...c,
            adjustedPercent: (c.percent / maxPercent) * 100,
          }));
          setResultCounts(counts);
        },
        (error) => console.log(error)
      );
  };

  const userId: number = 1; //todo
  useEffect(() => getResults(userId), []);

  return (
    <Container>
      <h1>Statistics</h1>
      <Statistics>
        <StatContainer>
          <div className="stat">1</div>
          <div className="label">Played</div>
        </StatContainer>
        <StatContainer>
          <div className="stat">100</div>
          <div className="label">Win %</div>
        </StatContainer>
        <StatContainer>
          <div className="stat">1</div>
          <div className="label">Current Streak</div>
        </StatContainer>
        <StatContainer>
          <div className="stat">1</div>
          <div className="label">Max Streak</div>
        </StatContainer>
      </Statistics>
      <BarChart resultCounts={resultCounts} />
    </Container>
  );
};

export default Stats;
