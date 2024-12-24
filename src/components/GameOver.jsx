import React from "react";

const GameOver = () => {
  return (
    <div>
      <h1>Game Over</h1>
      <button onClick={() => window.location.reload()}>Restart</button>
    </div>
  );
};

export default GameOver;
