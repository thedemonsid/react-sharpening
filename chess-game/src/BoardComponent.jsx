let symbols = {
  "w-pawn": "♙",
  "w-horse": "♘",
  "w-bishop": "♗",
  "w-rook": "♖",
  "w-queen": "♕",
  "w-king": "♔",
  "b-pawn": "♟",
  "b-horse": "♞",
  "b-bishop": "♝",
  "b-rook": "♜",
  "b-queen": "♛",
  "b-king": "♚",
};

export const initialBoardState = [
  [
    "b-rook",
    "b-horse",
    "b-bishop",
    "b-queen",
    "b-king",
    "b-bishop",
    "b-horse",
    "b-rook",
  ],
  [
    "b-pawn",
    "b-pawn",
    "b-pawn",
    "b-pawn",
    "b-pawn",
    "b-pawn",
    "b-pawn",
    "b-pawn",
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    "w-pawn",
    "w-pawn",
    "w-pawn",
    "w-pawn",
    "w-pawn",
    "w-pawn",
    "w-pawn",
    "w-pawn",
  ],
  [
    "w-rook",
    "w-horse",
    "w-bishop",
    "w-queen",
    "w-king",
    "w-bishop",
    "w-horse",
    "w-rook",
  ],
];

function Square({ isLight, piece, index_col, index_row, handlePieceMove }) {
  const handleClick = () => {
    handlePieceMove(index_row, index_col, piece, piece[0]);
  };

  return (
    <div
      className={`square ${isLight ? "light" : "dark"} ${
        piece ? "has-piece" : ""
      } `}
      onClick={handleClick}
    >
      {symbols[piece]}
    </div>
  );
}

export const Row = ({ isEvenRow, rowIndex, board, handlePieceMove }) => {
  const squares = [];
  for (let i = 0; i < 8; i++) {
    const isLight = isEvenRow ? i % 2 === 0 : i % 2 !== 0;
    squares.push(
      <Square
        isLight={isLight}
        piece={board[rowIndex][i]}
        key={i}
        index_col={i}
        index_row={rowIndex}
        handlePieceMove={handlePieceMove}
      />
    );
  }

  return <div className="row">{squares}</div>;
};
