import React, { useState, useEffect, useRef } from "react";
import './ElementScrollAnimation.css'; // Ensure this CSS file is linked correctly

const ElementScrollAnimation = ({ elements, onResult }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!elements || elements.length === 0) {
      onResult(null); // Handle empty elements list
      return;
    }

    // Start the animation interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % elements.length);
    }, 50); // Change element every 50ms

    // Set the timeout to stop the animation after 5 seconds
    timeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const randomIndex = Math.floor(Math.random() * elements.length);
      const selectedElement = elements[randomIndex];
      console.log("Selected Element:", selectedElement); // Debugging
      onResult(selectedElement);
    }, 5000); // 5 seconds

    // Cleanup function to clear interval and timeout
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [elements, onResult]);

  return (
    <div className="animation-overlay">
      <div className="scroll-container">
        <img
          src={`/assets/${elements[currentIndex]}.png`}
          alt={elements[currentIndex]}
        />
      </div>
    </div>
  );
};

export default ElementScrollAnimation;
