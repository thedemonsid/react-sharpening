import { useState } from "react";
import Box from "./Box";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items center mt-5">
        <Box></Box>
        <div className="flex justify-center">
          <button className="m-2 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md w-[30%]">
            &#8645; Swap &#8645;
          </button>
        </div>
        <Box where="to"></Box>
        <div className="flex justify-center">
          <button className="m-2 bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md w-[50%]">
            Convert USD to INR
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
