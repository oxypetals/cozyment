// LivesDisplay.jsx
import React from "react";

const LivesDisplay = ({ lives }) => (
  <div>
    <h1 className="lives">Lives: {lives}</h1> {/* Directly display the lives number */}
  </div>
);

export default LivesDisplay;
