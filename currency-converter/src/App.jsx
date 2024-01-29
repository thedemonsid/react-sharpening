import { useState } from "react";
import Box from "./Box";

function App() {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  const swapValues = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-16">
        <Box value={from} setValue={setFrom}></Box>
        <div className="flex justify-center ">
          <button
            onClick={swapValues}
            className="m-2 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2  rounded-md shadow-md "
          >
            &#8645; Swap &#8645;
          </button>
        </div>
        <Box where="to" value={to} setValue={setTo}></Box>
        <div className="flex justify-center">
          <button
            onClick={() => {
              setTo(from);
            }}
            className="m-2 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
          >
            Convert USD to INR
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
