import { useState } from "react";
import { useRef } from "react";
import Slider from "@mui/material/Slider";

function App() {
  const textRef = useRef();
  const [isCopied, setIsCopied] = useState(false);
  const [length, setLength] = useState(8);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeCharacter, setIncludeCharacter] = useState(false);
  // password generator function
  function generator(num, char, length) {
    let password = "";
    const characters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialCharacters = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (!num && !char) {
      for (let i = 0; i < length; i++) {
        const randomChar =
          characters[Math.floor(Math.random() * characters.length)];
        password += randomChar;
      }
    } else if (num && !char) {
      for (let i = 0; i < length; i++) {
        const randomChar =
          Math.random() < 0.5
            ? characters[Math.floor(Math.random() * characters.length)]
            : numbers[Math.floor(Math.random() * numbers.length)];
        password += randomChar;
      }
    } else if (char && !num) {
      for (let i = 0; i < length; i++) {
        const randomChar =
          Math.random() < 0.5
            ? characters[Math.floor(Math.random() * characters.length)]
            : specialCharacters[
                Math.floor(Math.random() * specialCharacters.length)
              ];
        password += randomChar;
      }
    } else {
      for (let i = 0; i < length; i++) {
        const randomChar =
          Math.random() < 0.33
            ? characters[Math.floor(Math.random() * characters.length)]
            : Math.random() < 0.66
            ? numbers[Math.floor(Math.random() * numbers.length)]
            : specialCharacters[
                Math.floor(Math.random() * specialCharacters.length)
              ];
        password += randomChar;
      }
    }

    return password;
  }
  // end of password generator function
  return (
    <div className="flex justify-center flex-col bg-gray-800 text-white min-h-screen border border-white-500 px-[25%]">
      <h1 className="text-4xl font-bold text-center mt-10">
        Password Generator
      </h1>
      <div className="flex justify-center mt-10 mx-[10%]">
        <div
          className={`bg-gray-700 p-4 rounded-lg mr-2 w-full ${
            isCopied ? "border-2 border-blue-500" : ""
          }`}
          ref={textRef}
        >
          {generator(includeNumber, includeCharacter, length)}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            navigator.clipboard.writeText(textRef.current.textContent);
            setIsCopied(true);
          }}
        >
          copy
        </button>
      </div>
      <div className="flex justify-between mt-10 items-center">
        <div className="w-[30%] mr-4">
          <Slider
            aria-label="Length"
            defaultValue={8}
            value={length}
            onChange={(event, newValue) => {
              setLength(newValue);
              setIsCopied(false);
            }}
            min={8}
            max={50}
          />
        </div>
        <div className="mr-4">Length : {length}</div>
        <div className="flex items-center mr-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={includeNumber}
            onChange={() => {
              setIncludeNumber(!includeNumber);
              setIsCopied(false);
            }}
          />
          <label>Include Number</label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={includeCharacter}
            onChange={() => {
              setIncludeCharacter(!includeCharacter);
              setIsCopied(false);
            }}
          />
          <label>Include Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
