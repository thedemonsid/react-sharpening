import React, { useState } from "react";

function Button({ color, onClick }) {
  return (
    <div className="flex justify-around ">
      <button
        id={color}
        className={`bg-${color}-600 m-1 rounded-lg py-2 px-4 text-white `}
        onClick={onClick}
      >
        {color}
      </button>
    </div>
  );
}

function App() {
  const [bgcolor, setBgcolor] = useState("green");
  return (
    <>
      <div className={`fixed w-[100%] h-[90%] bg-${bgcolor}-400`}></div>
      <div className="flex justify-center items-end fixed h-[100%] w-[100%] ">
        <div className="flex justify-center">
          <Button color={"blue"} onClick={() => setBgcolor("blue")}></Button>
          <Button color={"green"} onClick={() => setBgcolor("green")}></Button>
          <Button color={"red"} onClick={() => setBgcolor("red")}></Button>
        </div>
      </div>
    </>
  );
}
export default App;
