import { useState } from "react";
function Button({ color }) {
  return (
    <div className="flex justify-around ">
      <button
        id="blue"
        className={`bg-${color}-600 m-1 rounded-lg py-2 px-4 text-white `}
        onClick={() => setColor(color)}
      >
        {color}
      </button>
    </div>
  );
}
function App() {
  const [color, setColor] = useState("blue");

  return (
    <>
      <div className={`fixed inset-x-0 top-0 bottom-[5%]  bg-${color}-600`}></div>
      <div className="flex items-end justify-center min-h-screen z-10">
        <div className="flex justify-center">
          <Button color={"green"}></Button>
          <Button color={"blue"}></Button>
          <Button color={"red"}></Button>
        </div>
      </div>
    </>
  );
}

export default App;
