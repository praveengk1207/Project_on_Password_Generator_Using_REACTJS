import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [LEN, setLEN] = useState(8);
  const [NumAllow, setNumAllow] = useState(false);
  const [CharAllow, setCharAllow] = useState(false);
  const [Pass, setPass] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const PassGen = useCallback(() => {
    let generatedPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (NumAllow) str += "0123456789";
    if (CharAllow) str += "!#$%&*<>?@^_~";

    for (let i = 0; i < LEN; i++) {
      let char = Math.floor(Math.random() * str.length);
      generatedPassword += str.charAt(char);
    }

    setPass(generatedPassword);
  }, [LEN, NumAllow, CharAllow]);

  const copyTOclipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, Pass.length);
    window.navigator.clipboard
      .writeText(Pass)
      .then(() => {
        window.alert("Password copied successfully!");
      })
      .catch((error) => {
        console.error("Copy to clipboard failed:", error);
      });
  }, [Pass]);

  useEffect(() => {
    PassGen();
  }, [LEN, NumAllow, CharAllow, PassGen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center text-4xl p-4">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={Pass}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyTOclipboard}
            className="bg-blue-400 rounded-sm text-white p-2 focus:bg-blue-900"
          >
            COPY
          </button>
        </div>

        <div className="flex text-sm gap-x-2 py-4">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={LEN}
              className="cursor-pointer"
              onChange={(e) => {
                setLEN(Number(e.target.value));
              }}
            />
            <label className="text-white">Length: {LEN}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={NumAllow}
              id="numberInput"
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-white ">
              NUMBERS
            </label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={CharAllow}
              id="charinput"
              onChange={() => {
                setCharAllow((prev) => !prev);
              }}
            />
            <label htmlFor="charinput" className="text-white">
              CHARACTERS
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
