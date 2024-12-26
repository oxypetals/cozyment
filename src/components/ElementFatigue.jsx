import React from "react";

const ElementFatigue = ({ elementFatigue, powerNapActive }) => {
  return (
    <div className="fatigue-display">
      {Object.keys(elementFatigue).map((element) => (
        <div key={element} className="element-fatigue">
          <span>{element}</span>: {elementFatigue[element]} 
          {powerNapActive && <span> (Power Nap Active)</span>}
        </div>
      ))}
    </div>
  );
};

export default ElementFatigue;
