import { Row, initialBoardState } from "./BoardComponent";
import { useState } from "react";
import * as PossibleMoves from "./PossibleMoves";

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [previousMove, setPreviousMove] = useState();

  const handleClick = (row, col, piece) => {
    console.log({ column: col, row: row, piece: piece });

    //chesks if there is prevmove and if current piece is not empty
    if (previousMove && previousMove.piece && piece == null) {
      let pieceType = previousMove.piece.split("-")[1];
      let color = previousMove.piece.split("-")[0];
      let possMoves;

      switch (pieceType) {
        case "pawn":
          possMoves = PossibleMoves.getPawnMoves(
            [previousMove.column, previousMove.row],
            color
          );
          break;
        case "knight":
          possMoves = PossibleMoves.getKnightMoves([
            previousMove.column,
            previousMove.row,
          ]);
          break;
        case "bishop":
          possMoves = PossibleMoves.getBishopMoves([
            previousMove.column,
            previousMove.row,
          ]);
          break;
        case "rook":
          possMoves = PossibleMoves.getRookMoves([
            previousMove.column,
            previousMove.row,
          ]);
          break;
        case "queen":
          possMoves = PossibleMoves.getQueenMoves([
            previousMove.column,
            previousMove.row,
          ]);
          break;
        case "king":
          possMoves = PossibleMoves.getKingMoves([
            previousMove.column,
            previousMove.row,
          ]);
          break;
        default:
          return;
      }

      possMoves.some((move) => {
        if (move.column === col && move.row === row) {
          let newBoard = [...board];
          newBoard[previousMove.row][previousMove.column] = null;
          newBoard[row][col] = previousMove.piece;
          setBoard(newBoard);
          return true;
        }
        return false;
      });
    }

    setPreviousMove({ row, column: col, piece });
  };

  return (
    <div className="container">
      {Array.from({ length: 8 }).map((_, i) => (
        <Row
          isEvenRow={i % 2 === 0}
          rowIndex={i}
          key={i}
          board={board}
          handleClick={(row, col) => handleClick(row, col, board[row][col])}
        />
      ))}
    </div>
  );
};

export default ChessBoard;
