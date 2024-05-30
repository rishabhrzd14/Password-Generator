import React, { useCallback, useEffect, useState, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  // useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    str += numberAllowed ? "0123456789" : "";
    str += charAllowed ? "~!@#$%^&*()_+}{|?><.," : "";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasstoClip = useCallback(() => {
    setIsClicked(true);
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password, length]);

  // useEffect to reset isClicked when password or length changes
  useEffect(() => {
    setIsClicked(false);
  }, [password, length, numberAllowed, charAllowed]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          className="outline-none w-full py-1 px-3"
          placeholder="password"
          value={password}
          ref={passwordRef}
          readOnly
        />
        <button
          className="outline-none bg-blue-700 hover:bg-red-500 text-white px-3 py-0.5 shrink-0"
          onClick={copyPasstoClip}
        >
          {isClicked ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex item-center gap-x-1">
          <input
            type="range"
            min={8}
            max={15}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(Number(e.target.value));
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
