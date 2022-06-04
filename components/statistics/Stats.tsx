import { useEffect, useState } from "react";
import Enumerable from "linq";
import styled from "styled-components";

import { API_BASE_URL } from "../../constants/apiBaseUrl";
import { PuzzleResult } from "../../models/PuzzleResult";
import BarChart from "./BarChart";
import Footer from "./Footer";

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

  h1 {
    font-weight: 700;
    font-size: 16px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 10px;
  }
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
  const [results, setResults] = useState<PuzzleResult[]>([]);
  const [winPercent, setWinPercent] = useState<number | null>(null);
  const [currentStreak, setCurrentStreak] = useState<number | null>(null);
  const [maxStreak, setMaxStreak] = useState<number | null>(null);
  const [resultCounts, setResultCounts] = useState<ResultCount[]>([]);

  const getResults = (userId: number) => {
    let url: string = `${API_BASE_URL}/users/${userId}/results`;
    fetch(url)
      .then((response) => response.json())
      .then(
        (results: PuzzleResult[]) => {
          setResults(results);

          const winPercent = getWinPercent(results);
          setWinPercent(winPercent);

          const currentStreak = results.length; //TODO: Get actual streak value
          setCurrentStreak(currentStreak);

          const maxStreak = results.length; //TODO: Get actual streak value
          setMaxStreak(maxStreak);
        },
        (error) => console.log(error)
      );
  };

  const getWinPercent = (results: PuzzleResult[]): number => {
    const winCount = Enumerable.from(results)
      .where((r) => r.isWin)
      .toArray().length;

    const percent = (winCount / results.length) * 100;

    return percent;
  };

  const userId: number = 1; //todo
  useEffect(() => getResults(userId), []);

  return (
    <Container>
      <h1>Statistics</h1>
      <Statistics>
        <StatContainer>
          <div className="stat">{results.length}</div>
          <div className="label">Played</div>
        </StatContainer>
        <StatContainer>
          <div className="stat">{winPercent}</div>
          <div className="label">Win %</div>
        </StatContainer>
        <StatContainer>
          <div className="stat">{currentStreak}</div>
          <div className="label">Current Streak</div>
        </StatContainer>
        <StatContainer>
          <div className="stat">{maxStreak}</div>
          <div className="label">Max Streak</div>
        </StatContainer>
      </Statistics>
      <h1>Guess Distribution</h1>
      <BarChart results={results} />
      <Footer />
    </Container>
  );
};

export default Stats;
