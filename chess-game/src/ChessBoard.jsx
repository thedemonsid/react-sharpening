import { Row, initialBoardState } from "./BoardComponent";
import  { useState } from "react";
const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoardState);

  const handlePieceMove = (row, col, piece, color) => {
    const newBoard = [...board];
    //logic of game
  };

  const rows = [];
  for (let i = 0; i < 8; i++) {
    rows.push(
      <Row
        isEvenRow={i % 2 === 0}
        rowIndex={i}
        key={i}
        board={board}
        handlePieceMove={handlePieceMove}
      />
    );
  }
  return <div className="container">{rows}</div>;
};

export default ChessBoard;
