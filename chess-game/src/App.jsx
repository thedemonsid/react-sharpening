import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
const ChessBoard = React.lazy(() => import("./chessBoard/ChessBoard"));
const DashBoard = React.lazy(() => import("./DashBoard"));

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppBar></AppBar>
        <Routes>
          <Route
            path="/game"
            element={
              <Suspense fallback="..Loading">
                <div>
                  <ChessBoard></ChessBoard>
                </div>
              </Suspense>
            }
          ></Route>
          <Route
            path="/"
            element={
              <Suspense fallback="..Loading">
                <DashBoard></DashBoard>
              </Suspense>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <Suspense fallback="..Loading">
                <div>
                  <h1>About Us</h1>
                  <p>Welcome to our website!</p>
                </div>
              </Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
function AppBar() {
  const navigate = useNavigate();
  return (
    <div className="app-bar">
      <button onClick={() => navigate("/")}>Go to Home</button>
      <button onClick={() => navigate("/game")}>Go to Game</button>
      <button onClick={() => navigate("/about")}>About Us</button>
    </div>
  );
}
export default App;
