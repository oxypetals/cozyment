import React from "react";
import './GoalCompletion.css'; // Import the CSS file here

const GoalCompletion = ({ goalName, onClose }) => {
  return (
    <div 
      style={{
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Slightly transparent black background
        zIndex: 50,
      }}
    >
      <div 
        style={{
          textAlign: 'center',
        }}
      >
       <h2 
  className="h2text" 
  style={{
    fontSize: '50px', 
    margin: 0, 
    color: 'white',  // White text color for visibility
  }}
>
  
</h2>

   <img
        src={`/assets/yay.gif`}  // The goal image (you can replace this with any image source)
        alt={goalName}
        className="slideimg"
      />


      </div>
    </div>
  );
};

export default GoalCompletion;
