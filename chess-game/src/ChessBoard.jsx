import { Row, initialBoardState } from "./BoardComponent";
import { useState } from "react";
import * as PossibleMoves from "./PossibleMoves";
// For turns as "turn" decides which chance is now
let index = 0;
const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [previousMove, setPreviousMove] = useState();

  //Represents the current turn in the chess game.
  let turn = ["w", "b"];
  const handleClick = (row, col, piece) => {
    console.log({ column: col, row: row, piece: piece });

    //chesks if there is prevmove and if current piece is not empty
    if (previousMove && previousMove.piece) {
      let pieceType = previousMove.piece.split("-")[1];
      let color = previousMove.piece.split("-")[0];
      let possMoves;
      console.log(index);
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
      // console.log(possMoves)
      //Checking if the right player is playing
      if (turn[index % 2] == color && piece == null) {
        possMoves.some((move) => {
          if (move.column === col && move.row === row) {
            let newBoard = [...board];
            newBoard[previousMove.row][previousMove.column] = null;
            newBoard[row][col] = previousMove.piece;
            setBoard(newBoard);
            index++;
            return true;
          }
          return false;
        });
        
      }
      // killing mechanism hahahahahahahhahahaha
      if (turn[index % 2] == color && piece != null && piece[0] != color) {
        possMoves.some((move) => {
          if (move.column === col && move.row === row) {
            let newBoard = [...board];
            newBoard[previousMove.row][previousMove.column] = null;
            newBoard[row][col] = previousMove.piece;
            setBoard(newBoard);
            index++;
            return true;
          }
          return false;
        });
       
      }
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
