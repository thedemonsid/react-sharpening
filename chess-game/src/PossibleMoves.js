// Algorithm for Possible moves of all pieces
export function isValidMove(x, y) {
  // Check if the move is within the board boundaries
  if (x >= 0 && x < 8 && y >= 0 && y < 8) {
    return true;
  }
  return false;
}
//Function for Pawns
export function getPawnMoves(position, color) {
  const moves = [];
  const [x, y] = position;

  // White pawn moves
  if (color === "white") {
    // Move one step forward
    if (isValidMove(x, y + 1)) {
      moves.push([x, y + 1]);
    }

    // Move two steps forward from starting position
    if (y === 1 && isValidMove(x, y + 2)) {
      moves.push([x, y + 2]);
    }

    // Capture diagonally
    if (isValidMove(x - 1, y + 1)) {
      moves.push([x - 1, y + 1]);
    }
    if (isValidMove(x + 1, y + 1)) {
      moves.push([x + 1, y + 1]);
    }
  }

  // Black pawn moves
  if (color === "black") {
    // Move one step forward
    if (isValidMove(x, y - 1)) {
      moves.push([x, y - 1]);
    }

    // Move two steps forward from starting position
    if (y === 6 && isValidMove(x, y - 2)) {
      moves.push([x, y - 2]);
    }

    // Capture diagonally
    if (isValidMove(x - 1, y - 1)) {
      moves.push([x - 1, y - 1]);
    }
    if (isValidMove(x + 1, y - 1)) {
      moves.push([x + 1, y - 1]);
    }
  }

  return moves;
}
// Function for rook
export function getRookMoves(position) {
  const moves = [];
  const [x, y] = position;

  // Move vertically
  for (let i = y + 1; i < 8; i++) {
    if (isValidMove(x, i)) {
      moves.push([x, i]);
    } else {
      break;
    }
  }
  for (let i = y - 1; i >= 0; i--) {
    if (isValidMove(x, i)) {
      moves.push([x, i]);
    } else {
      break;
    }
  }

  // Move horizontally
  for (let i = x + 1; i < 8; i++) {
    if (isValidMove(i, y)) {
      moves.push([i, y]);
    } else {
      break;
    }
  }
  for (let i = x - 1; i >= 0; i--) {
    if (isValidMove(i, y)) {
      moves.push([i, y]);
    } else {
      break;
    }
  }

  return moves;
}
// Function for knight
export function getKnightMoves(position) {
  const moves = [];
  const [x, y] = position;

  const possibleMoves = [
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x + 1, y + 2],
    [x + 1, y - 2],
    [x - 1, y + 2],
    [x - 1, y - 2],
  ];

  for (const move of possibleMoves) {
    const [moveX, moveY] = move;
    if (isValidMove(moveX, moveY)) {
      moves.push(move);
    }
  }

  return moves;
}
// Function for bishop
export function getBishopMoves(position) {
  const moves = [];
  const [x, y] = position;

  // Diagonal moves
  const diagonalMoves = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  for (const [dx, dy] of diagonalMoves) {
    let [moveX, moveY] = [x + dx, y + dy];
    while (isValidMove(moveX, moveY)) {
      moves.push([moveX, moveY]);
      moveX += dx;
      moveY += dy;
    }
  }

  return moves;
}
// Function for queen
export function getQueenMoves(position) {
  const moves = [];
  const [x, y] = position;

  // Diagonal moves
  const diagonalMoves = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  // Horizontal and vertical moves
  const horizontalVerticalMoves = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // Check diagonal moves
  for (const [dx, dy] of diagonalMoves) {
    let [moveX, moveY] = [x + dx, y + dy];
    while (isValidMove(moveX, moveY)) {
      moves.push([moveX, moveY]);
      moveX += dx;
      moveY += dy;
    }
  }

  // Check horizontal and vertical moves
  for (const [dx, dy] of horizontalVerticalMoves) {
    let [moveX, moveY] = [x + dx, y + dy];
    while (isValidMove(moveX, moveY)) {
      moves.push([moveX, moveY]);
      moveX += dx;
      moveY += dy;
    }
  }

  return moves;
}
//Function for king
export function getKingMoves(position) {
  const moves = [];
  const [x, y] = position;

  // Possible moves for king
  const possibleMoves = [
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
  ];

  // Check each possible move
  for (const [dx, dy] of possibleMoves) {
    const moveX = x + dx;
    const moveY = y + dy;

    if (isValidMove(moveX, moveY)) {
      moves.push([moveX, moveY]);
    }
  }

  return moves;
}
