// useRewards.jsx

import { useState, useCallback } from "react";
import { allUniqueElements } from '../gameLogic/elementlist';

/**
 * Custom hook to manage game rewards, including triggering animations and updating game state.
 *
 * @param {Array} inventory - Current inventory of elements.
 * @param {Function} setInventory - Setter function to update the inventory.
 * @param {Function} setElementFatigue - Setter function to update element fatigue.
 * @param {Function} loseLife - Function to handle losing a life.
 * @param {number} lives - Current number of lives.
 * @param {Function} setLives - Setter function to update lives.
 * @param {Function} setIsGameOver - Setter function to set the game over state.
 * @param {Function} setShowRewards - Setter function to show/hide rewards UI.
 * @param {Function} setPowerNapActive - Setter function to activate power nap.
 *
 * @returns {Object} - Contains handlers and state for rewards.
 */
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

  /**
   * Handles the result from the animation by adding the selected element to inventory
   * and hiding the animation overlay.
   *
   * @param {string|null} resultElement - The element selected from the animation.
   */
  const handleAnimationResult = useCallback((resultElement) => {
    console.log("Animation Result:", resultElement); // Debugging
    if (resultElement) {
      setInventory(prev => [...prev, resultElement]);
    }
    setShowElementAnimation(false); // Hide the animation after result
  }, [
    // setInventory and setShowElementAnimation are stable and do not need to be included
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ]);

  /**
   * Handles different types of rewards based on the reward type.
   *
   * @param {string} rewardType - The type of reward to handle.
   */
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
        setAnimationElements([...allUniqueElements]); // Trigger animation for all elements
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
            setAnimationElements([...newElements]); // Trigger animation with new elements
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
    // Dependencies:
    inventory,
    lives,
    // setInventory, setLives, setIsGameOver, setShowRewards, setElementFatigue, setPowerNapActive
    // are stable and do not need to be included
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ]);

  return { handleReward, setShowRewards, showElementAnimation, animationElements, handleAnimationResult };
};

export default useRewards;
