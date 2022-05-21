interface GameOverProps {
  solution: string;
  isWin: boolean;
}

const GameOver: React.FC<GameOverProps> = (props: GameOverProps) => {
  return (
    <div>
      <div>The word was {props.solution}</div>
      <div>You {props.isWin ? "won" : "lost"}!</div>
    </div>
  );
};

export default GameOver;
