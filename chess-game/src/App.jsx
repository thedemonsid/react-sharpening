import React from "react";
import "./App.css";
import ChessBoard from "./ChessBoard";
import * as PossibleMoves from "./PossibleMoves";

const App = () => {
  return (
    <div>
      <ChessBoard></ChessBoard>
    </div>
  );
};

export default App;
