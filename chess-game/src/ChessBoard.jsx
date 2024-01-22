import { Row, initialBoardState } from "./BoardComponent";
import { useState } from "react";
import * as PossibleMoves from "./PossibleMoves";

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [previousMove, setPreviousMove] = useState();

  const handleClick = (row, col, piece) => {
    console.log("Square clicked:", row, col);

    // If there was a previous move and the current square is empty
    if (previousMove && piece == null) {
      // Swap the pieces
      let newBoard = [...board];
      newBoard[previousMove.row][previousMove.column] = null;
      newBoard[row][col] = previousMove.piece;
      setBoard(newBoard);
    }

    // Save the previous move
    const move = { row: row, column: col, piece };
    setPreviousMove(move);
    console.log(previousMove);
  };

  return (
    <div className="container">
      {Array.from({ length: 8 }).map((_, i) => (
        <Row
          isEvenRow={i % 2 === 0}
          rowIndex={i}
          key={i}
          board={board}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
};

export default ChessBoard;
