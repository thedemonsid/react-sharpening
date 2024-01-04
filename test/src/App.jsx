import { useState } from "react";

function App() {
  const [count, setCount] = useState(109);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount((count) => count + 1)}>
        Incrementor
      </button>
      <button onClick={() => setCount((count) => count - 1)}>
        Decrementor
      </button>
    </>
  );
}

export default App;
