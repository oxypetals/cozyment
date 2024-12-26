import React from 'react';

const CombinationArea = ({ selectedElements, elementImages, result }) => {
  return (
    <div className="combination-area" style={{
      minHeight: "150px",
      border: "none",
      padding: "10px",
      textAlign: "center",
    }}>
      <h3>Selected Elements:</h3>
      <div className="selected-elements">
        {selectedElements.map((element, index) => (
          <span key={index} className="selected-element">
            {elementImages[element] ? (
              <img 
                src={elementImages[element]} 
                alt={element}
                className="element-image"
                style={{ width: "150px", height: "150px", margin: "0 5px" }}
              />
            ) : (
              element
            )}
            {index === 0 && selectedElements.length > 1 && " + "}
          </span>
        ))}
      </div>
      {result && (
        <div className="result">
          <h3>Result:</h3>
          <div className="result-content">
            {elementImages[result] ? (
              <img 
                src={elementImages[result]} 
                alt={result}
                className="element-image"
                style={{ width: "150px", height: "150px" }}
              />
            ) : (
              <div className="placeholder-image" style={{ width: "150px", height: "150px" }}></div>
            )}
            <p className="result">{result}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CombinationArea;