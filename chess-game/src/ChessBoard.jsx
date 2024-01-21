import { Row, initialBoardState } from "./BoardComponent";
import { useState } from "react";
import * as PossibleMoves from "./PossibleMoves";

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoardState);
  
  const rows = [];
  for (let i = 0; i < 8; i++) {
    rows.push(
      <Row
        isEvenRow={i % 2 === 0}
        rowIndex={i}
        key={i}
        board={board}
        //handlePieceMove={handlePieceMove}
      />
    );
  }
  return <div className="container">{rows}</div>;
};

export default ChessBoard;
