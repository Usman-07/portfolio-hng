import React, { useState, useEffect } from "react";
import "./App.css";

const colorFamilies = [
  { name: "Orange", shades: ["#FFA500", "#FF8C00", "#FF7F50", "#E67E22", "#D2691E", "#CD853F"] },
  { name: "Blue", shades: ["#1E90FF", "#4682B4", "#5F9EA0", "#87CEEB", "#00BFFF", "#4169E1"] },
  { name: "Green", shades: ["#32CD32", "#228B22", "#66CDAA", "#8FBC8F", "#20B2AA", "#006400"] },
  { name: "Red", shades: ["#DC143C", "#B22222", "#FF4500", "#CD5C5C", "#A52A2A", "#8B0000"] },
  { name: "Purple", shades: ["#8A2BE2", "#6A5ACD", "#9932CC", "#BA55D3", "#DDA0DD", "#9400D3"] }
];

export const App = () => {
  const [currentFamilyIndex, setCurrentFamilyIndex] = useState(0);
  const [targetColor, setTargetColor] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newFamilyIndex = (currentFamilyIndex + 1) % colorFamilies.length;
    setCurrentFamilyIndex(newFamilyIndex);
    
    const currentShades = colorFamilies[newFamilyIndex].shades;
    const randomColor = currentShades[Math.floor(Math.random() * currentShades.length)];
    
    setTargetColor(randomColor);
    setOptions(shuffleArray([...currentShades]));
    setStatus("");
    setScore(0);
  };

  const refreshNewGame = () => {
    const currentShades = colorFamilies[currentFamilyIndex].shades;
    const randomColor = currentShades[Math.floor(Math.random() * currentShades.length)];
    setTargetColor(randomColor);
    setOptions(shuffleArray([...currentShades]));
  };

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore((prevScore) => prevScore + 1);
      setStatus("✅ Correct!");
    } else {
      setStatus("❌ Wrong! Try Again.");
    }
      refreshNewGame();
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h5 className="text-2xl font-bold mb-2" data-testid="gameInstructions">Guess the correct color!</h5>
      <h5 className="text-lg ">Hi Player, Pick an option from the box of random colours that matches correctly with the target color outside the box.</h5>
      <h5 className="text-xl font-semibold mb-2">Goodluck!</h5>

      <div className="w-32 h-32 rounded-md mb-4" style={{ backgroundColor: targetColor }} data-testid="colorBox"></div>

      <div className="grid grid-cols-3 gap-4 mb-4 border border-gray-300 p-6 rounded-md shadow-md">
        {options.map((color, index) => (
          <button key={color + index} className="w-24 h-24 rounded-md shuffle" style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)} data-testid="colorOption">
          </button>
        ))}
      </div>

      <p className="text-xl font-semibold mb-2" data-testid="gameStatus">{status}</p>
      <p className="text-xl font-semibold mb-2" data-testid="score">Score: {score}</p>

      <button className="px-6 py-3 bg-blue-500 text-white rounded-md" data-testid="newGameButton" onClick={startNewGame}>New Game</button>
    </div>
  );
};

