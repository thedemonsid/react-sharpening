import { useState } from "react";

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
  const [bgcolor, setColor] = useState("blue");
  return (
    <>
      <div className={`fixed inset-x-0 top-0 bottom-[5%] bg-${bgcolor}-600`}></div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex justify-center mt-auto">
          <Button color={"green"} onClick={() => setColor("green")}></Button>
          <Button color={"blue"} onClick={() => setColor("blue")}></Button>
          <Button color={"red"} onClick={() => setColor("red")}></Button>
        </div>
      </div>
    </>
  );
}

export default App;