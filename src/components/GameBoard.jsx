// GameBoard.jsx

import React, { useState, useEffect, useCallback } from "react";
import ElementList from "./ElementList";
import LivesDisplay from "./LivesDisplay";
import RewardsSection from './RewardsSection';
import CombinationArea from './CombinationArea';
import GoalsSection from './GoalsSection';
import GameOver from './GameOver';
import useRewards from './useRewards';
import recipes from "../gameLogic/recipes";
import goals from "../gameLogic/goals";
import "./GameBoard.css";
import GoalCompletion from "./GoalCompletion";  // Import GoalCompletion component
import ElementFatigue from './ElementFatigue';  // Import the new ElementFatigue component
import ElementScrollAnimation from './ElementScrollAnimation'; // Import the animation component

const GameBoard = () => {
  const [lives, setLives] = useState(3);
  const [inventory, setInventory] = useState(["fire", "water", "earth", "air"]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [elementImages, setElementImages] = useState({});
  const [elementFatigue, setElementFatigue] = useState({});
  const [discoveryCount, setDiscoveryCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [powerNapActive, setPowerNapActive] = useState(false); 
  const [showGoalCompletion, setShowGoalCompletion] = useState(false);  // Goal completion state

  const currentGoal = goals[currentGoalIndex];

  const loseLife = useCallback(() => {
    setLives((prevLives) => {
      const newLives = prevLives - 1;
      if (newLives <= 0) {
        setIsGameOver(true);
      }
      return newLives;
    });
  }, []);

  // Destructure all necessary values from useRewards
  const { 
    handleReward, 
    showElementAnimation, 
    animationElements, 
    handleAnimationResult 
  } = useRewards(
    inventory,
    setInventory,
    setElementFatigue,
    loseLife,
    lives,
    setLives,
    setIsGameOver,
    setShowRewards,
    setPowerNapActive
  );

  const restartGame = () => {
    setLives(3);
    setInventory(["fire", "water", "earth", "air"]);
    setSelectedElements([]);
    setResult(null);
    setShowConfetti(false);
    setCurrentGoalIndex(0);
    setElementFatigue({});
    setDiscoveryCount(0);
    setShowRewards(false);
    setIsGameOver(false);
  };

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const updateElementFatigue = useCallback((elements) => {
    if (currentGoal.level < 3) return; // Do not update fatigue if the level is below 3
    setElementFatigue(prev => {
      const updated = { ...prev };
      elements.forEach(element => {
        updated[element] = (updated[element] || 0) + 1;
      });
      return updated;
    });
  }, [currentGoal]);

  const canUseElement = useCallback((element) => {
    // Only apply fatigue rules if the current goal's level is 3 or higher
    if (currentGoal.level < 3) return true;
    return !elementFatigue[element] || elementFatigue[element] < 2;
  }, [elementFatigue, currentGoal]);

  const combineElements = useCallback(() => {
    const [element1, element2] = selectedElements;
    
    if (!canUseElement(element1) || !canUseElement(element2)) {
      alert("One or both elements are fatigued! They can't be used again.");
      setSelectedElements([]);
      return;
    }

    const recipe = recipes.find(
      (r) =>
        JSON.stringify(r.inputs.sort()) ===
        JSON.stringify([element1, element2].sort())
    );

    updateElementFatigue([element1, element2]);

    if (recipe) {
      if (!inventory.includes(recipe.output)) {
        setInventory((prev) => [...prev, recipe.output]);
        setResult(recipe.output);
        setDiscoveryCount((prev) => {
          const newCount = prev + 1;
          if (newCount % 4 === 0 && !showRewards) {
            setShowRewards(true);
          }
          return newCount;
        });

        // Goal completion logic
        if (currentGoal && recipe.output === currentGoal.name.toLowerCase()) {
          setCurrentGoalIndex((prev) => prev + 1);
          setShowHint(false);
          
          // Trigger goal completion screen to appear
          setShowGoalCompletion(true);

          // Optionally close after a set time (6.9 seconds)
          setTimeout(() => {
            setShowGoalCompletion(false);
          }, 6900); 
        }

        triggerConfetti();
      } else {
        setResult(recipe.output);
      }
    } else {
      loseLife();
      setResult(null);
    }

    setSelectedElements([]);
  }, [
    selectedElements, 
    inventory, 
    currentGoal, 
    loseLife, 
    triggerConfetti, 
    canUseElement, 
    updateElementFatigue, 
    showRewards
  ]);

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
      const timer = setTimeout(combineElements, 500);
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

  // Debugging: Log when inventory updates
  useEffect(() => {
    console.log("Inventory Updated:", inventory);
  }, [inventory]);

  // Debugging: Log when lives update
  useEffect(() => {
    console.log("Lives Updated:", lives);
  }, [lives]);

  // Debugging: Log when discovery count updates
  useEffect(() => {
    console.log("Discovery Count:", discoveryCount);
  }, [discoveryCount]);

  if (currentGoalIndex >= goals.length) {
    return <h2>All goals completed! 🎉</h2>;
  }

  if (isGameOver) {
    return <GameOver restartGame={restartGame} />;
  }

  return (
    <div>
      {showConfetti && <div className="confetti-container" />}
      <LivesDisplay lives={lives} />
      
      {/* Conditionally show ElementFatigue only if current goal level is above 2 */}
      {currentGoal.level > 2 && (
        <ElementFatigue 
          elementFatigue={elementFatigue}
          powerNapActive={powerNapActive}
        />
      )}
      
      <div className="discovery-count">
        Discoveries: {discoveryCount}
      </div>
      
      <ElementList 
        inventory={inventory} 
        onSelect={handleSelect} 
        elementImages={elementImages}
        elementFatigue={elementFatigue}
      />
      
      <CombinationArea 
        selectedElements={selectedElements}
        elementImages={elementImages}
        result={result}
      />
      
      {showRewards && (
        <RewardsSection 
          isVisible={showRewards} 
          onRewardSelect={handleReward} 
          onClose={() => setShowRewards(false)}
          currentGoalLevel={currentGoal.level} // Passing currentGoalLevel prop
        />
      )}

      <GoalsSection 
        currentGoal={currentGoal}
        showHint={showHint}
        setShowHint={setShowHint}
      />

      {showGoalCompletion && (
        <GoalCompletion 
          goalName={currentGoal.name} // Use currentGoal.name here
          onClose={() => setShowGoalCompletion(false)} 
        />
      )}

      {/* Conditionally render the ElementScrollAnimation */}
      {showElementAnimation && (
        <ElementScrollAnimation
          elements={animationElements}
          onResult={handleAnimationResult}
        />
      )}
    </div>
  );
};

export default GameBoard;
