import { useState } from "react";
import Slider from "@mui/material/Slider";

function App() {
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeCharacter, setIncludeCharacter] = useState(false);

  return (
    <div className="flex justify-center flex-col bg-gray-800 text-white min-h-screen border border-white p-[20%]">
      <h1 className="text-4xl font-bold text-center mt-10">
        Password Generator
      </h1>
      <div className="flex justify-center mt-10">
        <div className="bg-gray-700 p-4 rounded-lg mr-2 w-full">abcdfkfb</div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          copy
        </button>
      </div>
      <div className="flex justify-center mt-10">
        <div></div>
        <div className="mr-4">length:15</div>
        <div className="flex items-center mr-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={includeNumber}
            onChange={() => setIncludeNumber(!includeNumber)}
          />
          <label>Include Number</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={includeCharacter}
            onChange={() => setIncludeCharacter(!includeCharacter)}
          />
          <label>Include Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
