import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import "./App.css";

const App = () => {
  const [lives, setLives] = useState(["🥛", "🥛", "🥛"]);
  const [gameOver, setGameOver] = useState(false);

  const loseLife = () => {
    const remainingLives = lives.slice(0, -1);
    setLives(remainingLives);
    if (remainingLives.length === 0) setGameOver(true);
  };

  return (
    <div className="App">
<h1 class="cozy">Cozyment</h1>
      {gameOver ? (
        <GameOver />
      ) : (
        <GameBoard lives={lives} loseLife={loseLife} />
      )}
    </div>
  );
};

export default App;
