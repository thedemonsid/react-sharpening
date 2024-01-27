import { Row, initialBoardState } from "./BoardComponent";
import { useState } from "react";
import * as PossibleMoves from "./PossibleMoves";

const NUM_PLAYERS = 2;
let turnIndex = 0;

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoardState);
  const [previousMove, setPreviousMove] = useState();
  const turn = ["w", "b"];

  const handleClick = (row, col, piece) => {
    if (previousMove && previousMove.piece) {
      const pieceType = previousMove.piece.split("-")[1];
      const color = previousMove.piece.split("-")[0];
      let possibleMoves = getPossibleMoves(pieceType, color, previousMove, board);

      if (turn[turnIndex % NUM_PLAYERS] === color) {
        handleMove(row, col, piece, color, possibleMoves, board, setBoard,previousMove);
      }
    }

    setPreviousMove({ row, column: col, piece });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="cell"></div>
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="cell" key={i}>{i}</div>
        ))}
      </div>
      {Array.from({ length: 8 }).map((_, i) => (
        <div className="row" key={i}>
          <div className="cell">{i}</div>
          <Row
            isEvenRow={i % 2 === 0}
            rowIndex={i}
            board={board}
            handleClick={(row, col) => handleClick(row, col, board[row][col])}
          />
        </div>
      ))}
    </div>
  );
};

function getPossibleMoves(pieceType, color, previousMove, board) {
  let possibleMoves;
  switch (pieceType) {
    case "pawn":
      possibleMoves = PossibleMoves.getPawnMoves(
        [previousMove.column, previousMove.row],
        color,
        board
      );
      break;
    case "knight":
      possibleMoves = PossibleMoves.getKnightMoves([
        previousMove.column,
        previousMove.row,
      ]);
      break;
    case "bishop":
      possibleMoves = PossibleMoves.getBishopMoves([
        previousMove.column,
        previousMove.row,
      ],board);
      break;
    case "rook":
      possibleMoves = PossibleMoves.getRookMoves([
        previousMove.column,
        previousMove.row,
      ],board);
      break;
    case "queen":
      possibleMoves = PossibleMoves.getQueenMoves([
        previousMove.column,
        previousMove.row,
      ],board);
      break;
    case "king":
      possibleMoves = PossibleMoves.getKingMoves([
        previousMove.column,
        previousMove.row,
      ]);
      break;
    default:
      return;
  }
  return possibleMoves;
}

function handleMove(row, col, piece, color, possibleMoves, board, setBoard,previousMove) {
  if (piece === null || piece[0] !== color) {
    possibleMoves.some((move) => {
      if (move.X === col && move.Y === row) {
        let newBoard = [...board];
        newBoard[previousMove.row][previousMove.column] = null;
        newBoard[row][col] = previousMove.piece;
        setBoard(newBoard);
        turnIndex++;
        return true;
      }
      return false;
    });
  }
}

export default ChessBoard;