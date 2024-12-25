import React from "react";

const GameOver = ({ restartGame }) => {
  return (
    <div className="game-over-screen">
      <h1>Game Over</h1>
      <button onClick={restartGame} className="restart-button">
        Try Again
      </button>
    </div>
  );
};

export default GameOver;
