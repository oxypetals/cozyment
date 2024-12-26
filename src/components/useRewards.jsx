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
    setInventory(prev => [...prev, resultElement]);
    setShowElementAnimation(false); // Hide the animation after result
  }, [setInventory]);

  const handleReward = useCallback((rewardType) => {
    console.log("Handling Reward:", rewardType); // Debugging
    switch (rewardType) {
      case 'stabilize':
        if (lives <= 3) {
          const newLives = lives - 3;
          setLives(newLives);
          if (newLives <= 0) {
            setTimeout(() => setIsGameOver(true), 0);
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
        setAnimationElements(allUniqueElements); // Trigger animation for all elements
        break;

      case 'sleep':
        setElementFatigue({});
        break;

      case 'powernap':
        setPowerNapActive(true);
        break;

      case 'smallnap':
        break;

      case 'fortify':
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
            setAnimationElements(newElements); // Trigger animation with new elements
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
    inventory,
    setInventory,
    setElementFatigue,
    setLives,
    lives,
    setIsGameOver,
    setShowRewards,
    setPowerNapActive,
    setShowElementAnimation,
    setAnimationElements
  ]);

  return { handleReward, setShowRewards, showElementAnimation, animationElements, handleAnimationResult };
};

export default useRewards;
