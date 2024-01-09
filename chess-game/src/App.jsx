import React, { useState } from "react";
import "./App.css";
import { Row,initialBoardState } from "./Board";

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoardState);

  const handlePieceMove = (row, col, piece, color) => {
    const newBoard = [...board];
    if (piece && piece[0] === color) {
      if (piece === "b-pawn" || piece === "w-pawn") {
        if (color === "b") {
          if (
            newBoard[row + 1][col] === null ||
            newBoard[row + 1][col][0] === "w"
          ) {
            newBoard[row + 1][col] = piece;
            newBoard[row][col] = null;
            setBoard(newBoard);
            console.log(color);
          }
        } else if (color === "w") {
          if (
            newBoard[row - 1][col] === null ||
            newBoard[row - 1][col][0] === "b"
          ) {
            newBoard[row - 1][col] = piece;
            newBoard[row][col] = null;
            setBoard(newBoard);
            console.log(color);
          }
        }
      }
      // Add more movement logic for other pieces (rook, bishop, etc.) here
      if (piece === "b-horse" || piece === "w-horse") {
        const possibleMoves = [
          [row - 2, col - 1],
          [row - 2, col + 1],
          [row - 1, col - 2],
          [row - 1, col + 2],
          [row + 1, col - 2],
          [row + 1, col + 2],
          [row + 2, col - 1],
          [row + 2, col + 1],
        ];

        for (let move of possibleMoves) {
          const [moveRow, moveCol] = move;
          if (
            moveRow >= 0 &&
            moveRow < 8 &&
            moveCol >= 0 &&
            moveCol < 8 &&
            (newBoard[moveRow][moveCol] === null ||
              newBoard[moveRow][moveCol][0] !== color)
          ) {
            newBoard[moveRow][moveCol] = piece;
            newBoard[row][col] = null;
            setBoard(newBoard);
            console.log(color);
            break;
          }
        }
      }
    }
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
