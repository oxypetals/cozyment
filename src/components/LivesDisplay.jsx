// LivesDisplay.jsx
import React from "react";

const LivesDisplay = ({ lives }) => (
  <div>
    <h1 class="lives">Lives: {lives.join(" ")}</h1>
  </div>
);

export default LivesDisplay;
