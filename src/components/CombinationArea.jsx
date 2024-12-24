import React, { useState } from "react";

const CombinationArea = ({ elements, combineElements }) => {
  const [selectedElements, setSelectedElements] = useState([]);
  const [result, setResult] = useState(null); // Track the combination result

  const handleCombine = () => {
    const combinationResult = combineElements(selectedElements);
    if (combinationResult) {
      setResult(`You created: ${combinationResult}!`);
    } else {
      setResult("Combination failed.");
    }
    setSelectedElements([]); // Clear selected elements after combining
  };

  const toggleSelection = (element) => {
    setSelectedElements((prev) =>
      prev.includes(element)
        ? prev.filter((e) => e !== element)
        : [...prev, element]
    );
  };

  return (
    <div className="combination-area">
      <h2>Combine Elements</h2>
      <div className="selected-elements">
        <h3>Selected:</h3>
        {selectedElements.length > 0
          ? selectedElements.join(" + ")
          : "None selected"}
      </div>
      <div className="elements">
        <h3>Available Elements:</h3>
        {elements.map((el, idx) => (
          <button
            key={idx}
            onClick={() => toggleSelection(el)}
            className={selectedElements.includes(el) ? "selected" : ""}
            style={{
              margin: "5px",
              padding: "10px",
              border: "1px solid #ccc",
              backgroundColor: selectedElements.includes(el)
                ? "#d4edda"
                : "#f8f9fa",
            }}
          >
            {el}
          </button>
        ))}
      </div>
      <button
        onClick={handleCombine}
        disabled={selectedElements.length < 2}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor:
            selectedElements.length >= 2 ? "#28a745" : "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: selectedElements.length >= 2 ? "pointer" : "not-allowed",
        }}
      >
        Combine
      </button>
      {result && (
        <div
          className="result"
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>Result:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default CombinationArea;
