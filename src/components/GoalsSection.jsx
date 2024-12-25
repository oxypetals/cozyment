import React from 'react';
import "./GoalSection.css";

const GoalsSection = ({ currentGoal, showHint, setShowHint }) => {
  return (
    <div className="goals-section">
      {currentGoal ? (
        <>
          <h2 className="goal">Current Goal: {currentGoal.name}</h2>
          {showHint ? (
            <p>Combine: {currentGoal.inputs.join(" + ")}</p>
          ) : (
            <div 
              id="hintbtn" 
              onClick={() => setShowHint(true)} 
              className="hint-button"
              role="button"
              aria-label="Show hint"
            />
          )}
        </>
      ) : (
        <p>No current goal. All goals completed!</p>
      )}
    </div>
  );
};

export default GoalsSection;