import { useEffect, useState } from "react";
import { GameProvider, useGame } from "../context/gameContext.jsx";

const Square = ({ i }) => {
  const { board, handleClick } = useGame();
  return (
    <button className="square" onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );
};

const Popup = ({ message, onClose }) => (
  <div className="popup-overlay">
    <div className="popup">
      <h2>{message}</h2>
      <button onClick={onClose}>Play Again</button>
    </div>
  </div>
);

const Board = () => {
  const { winner, isNext, resetGame } = useGame();
  const [score, setScore] = useState({ X: 0, O: 0 });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (winner) {
      const t = setTimeout(() => setShowPopup(true), 500);
      return () => clearTimeout(t);
    }
  }, [winner]);

  const handleClosePopup = () => {
    if (winner === "X" || winner === "O") {
      setScore((prev) => ({ ...prev, [winner]: prev[winner] + 1 }));
    }
    setShowPopup(false);
    resetGame();
  };

  const isDraw = winner === "Draw";

  return (
    <div className="container">
      <h1 className="logo">
        Tic<span className="accent">OX</span>Play
      </h1>

      <div className="scoreboard">
        <span className="x-score">X: {score.X}</span>
        <span className="o-score">O: {score.O}</span>
      </div>

      <h2 className="status">
        {winner
          ? isDraw
            ? "It's a Draw!"
            : `Winner: ${winner}`
          : `Turn: ${isNext ? "X" : "O"}`}
      </h2>

      <div className="board">
        {Array.from({ length: 9 }, (_, i) => (
          <Square key={i} i={i} />
        ))}
      </div>

      <button className="reset" onClick={resetGame}>
        Reset Game
      </button>

      {showPopup && (
        <Popup
          message={isDraw ? "Match Draw!" : `${winner} Wins!`}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default function GameBoard() {
  return (
    <GameProvider>
      <Board />
    </GameProvider>
  );
}
