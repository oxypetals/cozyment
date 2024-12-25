import React from 'react';

const FatigueDisplay = ({ elementFatigue }) => {
  return (
    <div className="fatigue-display" style={{ 
      position: 'absolute', 
      top: '10px', 
      right: '10px', 
      padding: '10px', 
      background: 'rgba(0,0,0,0.1)', 
      borderRadius: '5px' 
    }}>
      <h4>Element Uses:</h4>
      {Object.entries(elementFatigue).map(([element, uses]) => (
        <div key={element}>
          {element}: {uses}/2
        </div>
      ))}
    </div>
  );
};

export default FatigueDisplay;