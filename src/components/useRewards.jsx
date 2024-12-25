import { useState, useCallback } from "react";
import recipes from "../gameLogic/recipes";

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
  const handleReward = useCallback((rewardType) => {
    switch (rewardType) {
      case 'stabilize':
        if (lives <= 3) {
          const newLives = lives - 3;
          setLives(newLives);
          if (newLives <= 0) {
            // Ensure game over is triggered after state update
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
        const allElements = [...Object.keys(recipes), ...inventory];
        const randomElement = allElements[Math.floor(Math.random() * allElements.length)];
        setInventory(prev => [...prev, randomElement]);
        break;
     case 'sleep': // Changed from 'revitalize' to 'sleep'
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
          const newElements = Object.keys(recipes).filter(elem => !inventory.includes(elem));
          if (newElements.length > 0) {
            const newElement = newElements[Math.floor(Math.random() * newElements.length)];
            setInventory(prev => [...prev, newElement]);
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
    setShowRewards(false);
  }, [inventory, setInventory, setElementFatigue, setLives, lives, setIsGameOver, setShowRewards, setPowerNapActive]);

  return { handleReward, setShowRewards };
};

export default useRewards;