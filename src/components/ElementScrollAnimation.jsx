import React, { useState, useEffect } from "react";
import './ElementScrollAnimation.css'; // Ensure this CSS file is linked correctly

const ElementScrollAnimation = ({ elements, onResult }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Start the animation when the component mounts
    const id = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % elements.length);
    }, 50); // Rapidly change element every 50ms

    setIntervalId(id);
    return () => clearInterval(id); // Clean up interval
  }, [elements.length]);

  useEffect(() => {
    // Stop the animation after a set time and call the result callback
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      const randomIndex = Math.floor(Math.random() * elements.length);
      onResult(elements[randomIndex]);
    }, 5000); // End animation after 5 seconds

    return () => clearTimeout(timeoutId); // Clean up timeout
  }, [intervalId, elements, currentIndex, onResult]);

  return (
    <div className="animation-overlay">
      <div className="scroll-container">
        <img src={`/assets/${elements[currentIndex]}.png`} alt={elements[currentIndex]} />
      </div>
    </div>
  );
};

export default ElementScrollAnimation;
