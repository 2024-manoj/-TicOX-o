import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

function getWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every((cell) => cell)) {
    return "Draw";
  }
  return null;
}

export const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);

  const winner = useMemo(() => getWinner(board), [board]);

  const handleClick = useCallback(
    (i) => {
      if (board[i] || winner) return;
      const newBoard = [...board];
      newBoard[i] = isNext ? "X" : "O";
      setBoard(newBoard);
      setIsNext((prev) => !prev);
    },
    [board, isNext, winner],
  );

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsNext(true);
  }, []);

  return (
    <GameContext.Provider
      value={{ board, isNext, winner, handleClick, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
