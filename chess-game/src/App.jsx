import "./App.css";
import { useState, useEffect } from "react";
let symbols = {
  'w-pawn': '♙',
  'w-horse': '♘',
  'w-bishop': '♗',
  'w-rook': '♖',
  'w-queen': '♕',
  'w-king': '♔',
  'b-pawn': '♟',
  'b-horse': '♞',
  'b-bishop': '♝',
  'b-rook': '♜',
  'b-queen': '♛',
  'b-king': '♚'
};
let initialBoardState = [
  ['b-rook', 'b-horse', 'b-bishop', 'b-queen', 'b-king', 'b-bishop', 'b-horse', 'b-rook'],
  ['b-pawn', 'b-pawn', 'b-pawn', 'b-pawn', 'b-pawn', 'b-pawn', 'b-pawn', 'b-pawn'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['w-pawn', 'w-pawn', 'w-pawn', 'w-pawn', 'w-pawn', 'w-pawn', 'w-pawn', 'w-pawn'],
  ['w-rook', 'w-horse', 'w-bishop', 'w-queen', 'w-king', 'w-bishop', 'w-horse', 'w-rook']
];

function Square({ isLight, piece, index_col, index_row} ) {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    const handleDeselect = () => {
      setSelected(false);
    };

    if (selected) {
      document.addEventListener('click', handleDeselect);
    }

    return () => {
      document.removeEventListener('click', handleDeselect);
    };
  }, [selected]);

  index_row=index_row+1;
  return (
    <div 
      className={`square ${isLight ? 'light' : 'dark'} ${piece ? 'has-piece' : ''} ${selected ? 'selected' : ''}`} 
      onClick={handleClick}
    >
      {symbols[piece]}
    </div>
  );
}

function Row({ isEvenRow, rowIndex }) {
  const squares = [];
  for (let i = 0; i < 8; i++) {
    const isLight = isEvenRow ? (i % 2 === 0) : (i % 2 !== 0);
    squares.push(<Square isLight={isLight} piece={initialBoardState[rowIndex][i]} key={i} index_col={i} index_row={rowIndex} />);
  }

  return <div className="row">{squares}</div>;
}

const ChessBoard = () => {
  const rows = [];
  for (let i = 0; i < 8; i++) {
    rows.push(<Row isEvenRow={i % 2 === 0} rowIndex={i} key={i} />);
  }
  return <div className="container">{rows}</div>;
};

export default ChessBoard;