import React, { useState, useEffect } from "react";

const ElementList = ({ inventory, onSelect }) => {
  const [elementImages, setElementImages] = useState({});

  useEffect(() => {
    const loadImages = () => {
      const images = {};
      inventory.forEach((element) => {
        const imageUrl = `/assets/${element}.png`; // Construct the image URL based on element name
        images[element] = imageUrl; // Directly assign the URL instead of fetching
      });
      setElementImages(images);
    };

    loadImages(); // Run when the inventory changes
  }, [inventory]); // Dependencies on inventory so images reload when inventory changes

  return (
    <div className="element-list">
      <h2>Your Elements</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: "10px",
          width: "100%",
          maxWidth: "1200px", // Prevents the grid from becoming too wide
          margin: "0 auto", // Centers the grid
          overflowY: "auto", // Allows vertical scrolling if needed
          padding: "10px",
        }}
      >
        {inventory.map((element, index) => (
          <div
            key={index}
            onClick={() => onSelect(element)}
            style={{
              cursor: "pointer",
              border: "none",
              padding: "10px",
              borderRadius: "5px",
              textAlign: "center",
              backgroundColor: "transparent",
              minWidth: "80px", // Ensures minimum width for each element
              aspectRatio: "1", // Makes each grid item square
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <div
              style={{
                width: "150px",
                height: "150px",
                backgroundColor: "transparent",
                marginBottom: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                borderRadius: "4px",
              }}
            >
              {elementImages[element] ? (
                <img
                  src={elementImages[element]}
                  alt={element}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    // Fallback in case image is not found
                    e.target.style.display = 'none'; // Hide image if it fails to load
                  }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%" }}>
                  {/* Optional: Show a fallback placeholder here */}
                  <span>No Image</span>
                </div>
              )}
            </div>
            <span
              style={{
                fontSize: "0.9rem",
                wordBreak: "break-word",
                maxWidth: "100%",
              }}
            >
              {element}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElementList;
