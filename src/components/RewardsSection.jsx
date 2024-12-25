import React, { useState, useEffect } from 'react';
import RewardCard from './RewardCard';

// Define all available cards as a constant
const ALL_REWARD_CARDS = [
  'hydrate',
  'hydrateultra',
  'discover',
  'discoverultra',
  'stabilize',
  'powernap',
  'smallnap',
  'fortify',
  'secretfountain',
  'drinkingpond',
  'blessingfl'
];

const RewardsSection = ({ 
  isVisible, 
  onRewardSelect, 
  onClose,
  availableCards = ALL_REWARD_CARDS  // Use the full pool as default
}) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (isVisible) {
      const updateSize = () => {
        const vw = Math.min(document.documentElement.clientWidth, window.innerWidth);
        const vh = Math.min(document.documentElement.clientHeight, window.innerHeight);
        const gapSize = Math.min(vw, vh) * 0.02;
        const availableWidth = vw * 0.9;
        const availableHeight = vh * 0.9;
        const cardWidth = Math.floor(availableWidth / 3) - (gapSize * 2);
        const cardHeight = Math.floor(cardWidth * 1.3);
        
        setContainerSize({ 
          width: cardWidth, 
          height: cardHeight,
          gap: gapSize
        });
      };

      updateSize();
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && !selectedCards.length) {
      // Filter out 'sleep' from available cards if it exists
      const otherCards = availableCards.filter(card => card !== 'sleep');
      
      // Randomly select 2 cards from remaining cards
      const shuffled = [...otherCards]
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
      
      // Add 'sleep' card to the selection
      setSelectedCards(['sleep', ...shuffled]);
    }
  }, [isVisible, availableCards]);

  const handleCardClick = (cardType) => {
    setSelectedReward(cardType);
    onRewardSelect(cardType);
    setTimeout(onClose, 1000);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'slideIn 0.5s ease-out',
      zIndex: 1000,
      padding: '2vh'
    }}>
      <h1 style={{ color: '#fff', marginBottom: '2vh' }}>Choose Your Reward</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(3, ${containerSize.width}px)`,
        gap: `${containerSize.gap}px`,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: `${(containerSize.width * 3) + (containerSize.gap * 2)}px`,
        margin: '0 auto'
      }}>
        {selectedCards.map((cardType) => (
          <div key={cardType} style={{
            width: `${containerSize.width}px`,
            height: `${containerSize.height}px`,
          }}>
            <RewardCard
              type={cardType}
              isSelected={selectedReward === cardType}
              onClick={() => handleCardClick(cardType)}
            />
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default RewardsSection;