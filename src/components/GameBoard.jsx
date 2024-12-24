import React, { useState, useEffect, useCallback } from "react";
import ElementList from "./ElementList";
import LivesDisplay from "./LivesDisplay";
import recipes from "../gameLogic/recipes";
import goals from "../gameLogic/goals";
import "./GameBoard.css";

const GameBoard = ({ lives, loseLife }) => {
  const [inventory, setInventory] = useState(["fire", "water", "earth", "air"]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [elementImages, setElementImages] = useState({});
  
  const currentGoal = goals[currentGoalIndex];

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }, []);

  const combineElements = useCallback(() => {
  const [element1, element2] = selectedElements;
  const recipe = recipes.find(
    (r) =>
      JSON.stringify(r.inputs.sort()) ===
      JSON.stringify([element1, element2].sort())
  );

  if (recipe) {
    if (!inventory.includes(recipe.output)) {
      setInventory(prev => [...prev, recipe.output]);
      setResult(recipe.output);
      if (currentGoal && recipe.output === currentGoal.name.toLowerCase()) {
        alert(`Goal completed: ${currentGoal.name}`);
        setCurrentGoalIndex(prev => prev + 1);
        setShowHint(false);
      }
      triggerConfetti();
    } else {
      setResult(recipe.output);
    }
  } else {
    console.log("Invalid combination, losing life");
    loseLife(); // Ensure that this is only called once
    setResult(null);
  }

  setSelectedElements([]); // Reset selected elements after combination
}, [selectedElements, inventory, currentGoal, loseLife, triggerConfetti]);

  useEffect(() => {
    const loadElementImages = async () => {
      const images = {};
      for (const element of inventory) {
        try {
          const imageUrl = `/assets/${element}.png`;
          const response = await fetch(imageUrl);
          if (response.ok) {
            images[element] = imageUrl;
          } else {
            images[element] = null;
          }
        } catch (error) {
          console.warn(`Failed to load image for ${element}:`, error);
          images[element] = null;
        }
      }
      setElementImages(images);
    };

    loadElementImages();
  }, [inventory]);

  useEffect(() => {
    if (selectedElements.length === 2) {
      const timer = setTimeout(() => {
        combineElements();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selectedElements, combineElements]);

  const handleSelect = (element) => {
    if (selectedElements.length === 2) {
      setSelectedElements([element]);
      setResult(null);
    } else if (selectedElements.includes(element)) {
      setSelectedElements(prev =>
        prev.filter(selected => selected !== element)
      );
    } else {
      setSelectedElements(prev => [...prev, element]);
    }
  };

  if (currentGoalIndex >= goals.length) {
    return <h2>All goals completed! 🎉</h2>;
  }

  return (
    <div>
      {showConfetti && <div className="confetti-container"></div>}
      <LivesDisplay lives={lives} />
      <ElementList 
        inventory={inventory} 
        onSelect={handleSelect} 
        elementImages={elementImages}
      />
      <div
        className="combination-area"
        style={{
          minHeight: "150px",
          border: "none",
          padding: "10px",
          textAlign: "center",
          margin: "20px 0",
        }}
      >
        <h3>Selected Elements:</h3>
        <div className="selected-elements">
          {selectedElements.map((element, index) => (
            <span key={index} className="selected-element">
              {elementImages[element] ? (
                <img 
                  src={elementImages[element]} 
                  alt={element}
                  className="element-image"
                  style={{ width: "150px", height: "150px", margin: "0 5px" }}
                />
              ) : (
                element
              )}
              {index === 0 && selectedElements.length > 1 && " + "}
            </span>
          ))}
        </div>
        {result && (
          <div className="result">
            <h3>Result:</h3>
            <p>
              {elementImages[result] ? (
                <img 
                  src={elementImages[result]} 
                  alt={result}
                  className="element-image"
                  style={{ width: "150px", height: "150px" }}
                />
              ) : (
                result
              )}
            </p>
          </div>
        )}
      </div>
      <div className="goals-section">
        {currentGoal ? (
          <>
            <h2 className="goal">Current Goal: {currentGoal.name}</h2>
            {showHint ? (
              <p>Combine: {currentGoal.inputs.join(" + ")}</p>
            ) : (
              <button onClick={() => setShowHint(true)}>Hint</button>
            )}
          </>
        ) : (
          <p>No current goal. All goals completed!</p>
        )}
      </div>
    </div>
  );
};

export default GameBoard;