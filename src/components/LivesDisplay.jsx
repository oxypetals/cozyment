import React, { useState, useEffect } from "react";
import "./LivesDisplay.css";
import waterDropImage from '../assets/waterglass.png';

const LivesDisplay = ({ lives }) => {
  const [currentLives, setCurrentLives] = useState(lives);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (lives !== currentLives) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setCurrentLives(lives);
        setIsAnimating(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [lives, currentLives]);

  const waterdrops = Array(currentLives).fill(null).map((_, i) => (
    <img 
      key={i}
      src={waterDropImage}
      alt="waterdrop"
      className={`waterdrop ${isAnimating ? 'fade' : ''}`}
    />
  ));

  return (
    <div className="lives-container">
      <span className="lives-text">Lives:</span>
      <div>{waterdrops}</div>
    </div>
  );
};

export default LivesDisplay;