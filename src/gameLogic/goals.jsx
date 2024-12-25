const goals = [
  // Level 1 Goals (Easiest)
  { level: 1, name: "Rain", inputs: ["water", "rain"] },
  { level: 1, name: "Flower", inputs: ["rain", "plant"] },
  { level: 1, name: "Tree", inputs: ["plant", "water"] },
  { level: 1, name: "Glass", inputs: ["sand", "fire"] },
  { level: 1, name: "Bottle", inputs: ["glass", "water"] },
  { level: 1, name: "Brick", inputs: ["clay", "fire"] },
  { level: 1, name: "Lightning", inputs: ["thunderstorm", "fire"] },
  { level: 1, name: "Perfume", inputs: ["fragrance", "water"] },

  // Level 2 Goals (Intermediate)
  { level: 2, name: "Garden", inputs: ["terrarium", "plant"] },
  { level: 2, name: "Forest", inputs: ["greenhouse", "plant"] },
  { level: 2, name: "Greenhouse", inputs: ["factory", "glass"] },
  { level: 2, name: "Pie", inputs: ["pastry", "fruit"] },
  { level: 2, name: "Sweet Toast", inputs: ["toast", "honey"] },
  { level: 2, name: "Coffee", inputs: ["heat", "coffee beans"] },
  { level: 2, name: "Butter", inputs: ["milk", "heat"] },
  { level: 2, name: "Ice Cream", inputs: ["cream", "fruit"] },

  // Level 3 Goals (Hardest)
  { level: 3, name: "Celebration Cake", inputs: ["cake", "ice cream"] },
  { level: 3, name: "Jungle", inputs: ["forest", "rain"] },
  { level: 3, name: "Factory", inputs: ["windmill", "earth"] },
  { level: 3, name: "Smog", inputs: ["smoke", "water"] },
  { level: 3, name: "Pollution", inputs: ["smog", "windmill"] },
  { level: 3, name: "Electricity", inputs: ["windmill", "coal"] },
  { level: 3, name: "Stove", inputs: ["furnace", "metal"] },
  { level: 3, name: "Chocolate Pie", inputs: ["chocolate", "pie"] },
];

export default goals;
