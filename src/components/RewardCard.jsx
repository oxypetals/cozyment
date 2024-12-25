import React from 'react';
import './RewardCard.css'; // Adjust the path if necessary

const RewardCard = ({ type, onClick, isSelected, lives }) => {
  const getCardContent = () => {
    switch (type) {
      case 'sleep':
        return {
          title: 'Sleep',
          description: 'Reset all element fatigue',
          image: '/assets/sleep.png'
        };
      case 'powernap':
        return {
          title: 'Power Nap',
          description: 'Ignore element fatigue until next reward screen',
          image: '/assets/powernap.png'
        };
      case 'smallnap':
        return {
          title: 'Small Nap',
          description: 'Ignore the next element fatigue',
          image: '/assets/smallnap.png'
        };
      case 'fortify':
        return {
          title: 'Fortify',
          description: 'Select one element to remove fatigue for this game round',
          image: '/assets/fortify.png'
        };
      case 'hydrate':
        return {
          title: 'Drink',
          description: 'Gain one additional life',
          image: '/assets/hydrate.png'
        };
      case 'hydrateultra':
        return {
          title: 'Magic Bottle',
          description: 'Gain two additional lives',
          image: '/assets/magicbottle.png'
        };
      case 'discover':
        return {
          title: 'Discover',
          description: 'Add a random element (new or existing)',
          image: '/assets/discover.png'
        };
      case 'discoverultra':
        return {
          title: 'Discover Ultra',
          description: 'Lose one life to discover a new element',
          image: '/assets/discoverultra.png'
        };
      case 'stabilize':
        return {
          title: 'Stabilize',
          description: 'Lose three lives to keep one element permanently',
          image: '/assets/stabilize.png'
        };
      case 'blessingfl':
        return {
          title: 'Blessing of the Flowers',
          description: 'Gain three lives if you have discovered the flower',
          image: '/assets/blessingfl.png'
        };
      case 'secretfountain':
        return {
          title: 'Secret Fountain',
          description: lives >= 3 ? 'Gain 3 extra lives' : 'You need at least 3 lives to use this card',
          image: '/assets/secretfountain.png',
          disabled: lives < 3
        };
      case 'drinkingpond':
        return {
          title: 'Drinking Pond',
          description: lives >= 2 ? 'Gain 1 extra life' : 'You need at least 2 lives to use this card',
          image: '/assets/drinkingpond.png',
          disabled: lives < 2
        };
      default:
        return {
          title: 'Random',
          description: 'Mystery card',
          image: '/assets/mystery.png'
        };
    }
  };

  const { title, description, image, disabled } = getCardContent();

  return (
     <div
      className={`reward-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? null : onClick}
      style={{
        width: '90%',
        height: '50%',
        border: 'none',
        borderRadius: '15px',
        padding: '3%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'transform 0.3s ease',
        transform: isSelected ? 'scale(1.05)' : 'scale(0.8)',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <img
        src={image}
        alt={title}
        onError={(e) => {
          console.warn(`Image not found for ${type}: ${image}`);
          e.target.src = '/assets/hydrate-card.png'; // Fallback image
        }}
       style={{
          width: '80%',
          height: 'auto',
          objectFit: 'contain',
          marginBottom: '5%'
        }}
      />

       <div style={{ 
        textAlign: 'center',
        width: '100%'
      }}>
        <h2 style={{ 
          fontSize: 'clamp(1rem, 3vw, 2rem)',
          marginBottom: '0.5em'
        }}>{title}</h2>
        <p style={{ 
          fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
          padding: '0 5%'
        }}>{description}</p>
      </div>
    </div>
  );
};

export default RewardCard;
