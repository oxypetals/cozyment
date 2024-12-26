// useRewards.jsx

import { useState, useCallback } from "react";
import { allUniqueElements } from '../gameLogic/elementlist';

const useRewards = (
  inventory,
  setInventory,
  setElementFatigue,
  loseLife,
  lives,
  setLives,
  setIsGameOver,
  setShowRewards,
  setPowerNapActive
) => {
  const [showElementAnimation, setShowElementAnimation] = useState(false);
  const [animationElements, setAnimationElements] = useState([]);

  // Callback to handle the result from the jackpot animation
  const handleAnimationResult = useCallback((resultElement) => {
    console.log("Animation Result:", resultElement); // Debugging
    if (resultElement) {
      setInventory(prev => [...prev, resultElement]);
    }
    setShowElementAnimation(false); // Hide the animation after result
  }, [setInventory, setShowElementAnimation]);

  const handleReward = useCallback((rewardType) => {
    console.log("Handling Reward:", rewardType); // Debugging
    switch (rewardType) {
      case 'stabilize':
        if (lives <= 3) {
          const newLives = lives - 3;
          setLives(newLives);
          if (newLives <= 0) {
            setIsGameOver(true);
          }
        } else {
          alert("Not enough lives for Stabilize! You need 3 or fewer lives.");
        }
        break;

      case 'hydrate':
        setLives(prev => prev + 1);
        break;

      case 'discover':
        setShowElementAnimation(true);
        setAnimationElements([...allUniqueElements]); // Spread to create a new array reference
        break;

      case 'sleep':
        setElementFatigue({});
        break;

      case 'powernap':
        setPowerNapActive(true);
        break;

      case 'smallnap':
        // Implement logic if needed
        break;

      case 'fortify':
        // Implement logic if needed
        break;

      case 'hydrateultra':
        setLives(prev => prev + 2);
        break;

      case 'discoverultra':
        if (lives > 1) {
          setLives(prev => prev - 1);
          const newElements = allUniqueElements.filter(elem => !inventory.includes(elem));
          if (newElements.length > 0) {
            setShowElementAnimation(true);
            setAnimationElements([...newElements]); // Spread to create a new array reference
          } else {
            alert("No new elements to discover!");
          }
        } else {
          alert("Not enough lives for Discover Ultra!");
        }
        break;

      case 'secretfountain':
        if (lives >= 3) {
          setLives(prev => prev + 3);
        } else {
          alert("You need at least 3 lives to use Secret Fountain!");
        }
        break;

      case 'drinkingpond':
        if (lives >= 2) {
          setLives(prev => prev + 1);
        } else {
          alert("You need at least 2 lives to use Drinking Pond!");
        }
        break;

      case 'blessingfl':
        if (inventory.includes('flower')) {
          setLives(prev => prev + 3);
        } else {
          alert("You need to discover the flower to use Blessing of the Flower!");
        }
        break;

      default:
        break;
    }
    setShowRewards(false); // Hide rewards UI after handling
  }, [
    lives, // 'lives' is a state variable that can change
    inventory, // 'inventory' is a state variable that can change
    setLives,
    setIsGameOver,
    setShowElementAnimation,
    setShowRewards,
    setElementFatigue,
    setPowerNapActive
  ]);

  return { handleReward, setShowRewards, showElementAnimation, animationElements, handleAnimationResult };
};

export default useRewards;
