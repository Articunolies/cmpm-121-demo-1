import "./style.css";

interface Item {
  name: string;
  price: number;
  productionRate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Worm",
    price: 10,
    productionRate: 0.1,
    description: "A small worm that helps find crabs.",
  },
  {
    name: "Shrimp",
    price: 100,
    productionRate: 2,
    description: "A shrimp that attracts more crabs.",
  },
  {
    name: "Fish",
    price: 1000,
    productionRate: 50,
    description: "A fish that brings in a lot of crabs.",
  },
  {
    name: "Crab Trap",
    price: 5000,
    productionRate: 200,
    description: "A trap that catches crabs automatically.",
  },
  {
    name: "Crab Boat",
    price: 20000,
    productionRate: 1000,
    description: "A boat that hauls in crabs by the hundreds.",
  },
];

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Crab Fisherman Life";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Inspiration from https://egitelma.github.io/cmpm-121-demo-1/ to move the emoji to the bottom middle and make it bigger.
// Add a button
const button = document.createElement("button");
button.innerHTML = "🦀";
button.style.backgroundColor = "green"; // Change the color to green
button.style.width = "300px"; // Triple the size (assuming original size was 50px)
button.style.height = "300px"; // Triple the size (assuming original size was 50px)
button.style.fontSize = "100px"; // Adjust font size to fit the new button size
button.style.position = "absolute"; // Position it absolutely
button.style.bottom = "20px"; // Move it towards the bottom
button.style.left = "50%"; // Center it horizontally
button.style.transform = "translateX(-50%)"; // Adjust for the button's width
app.append(button);

// Add a <div> element to the page that will report on the value of a counter with a message like “12 cookies”
const counter = document.createElement("div");
counter.innerHTML = "0 crabs";
app.append(counter);

let crabCount = 0;

button.addEventListener("click", () => {
  crabCount++;
  counter.innerHTML = `${crabCount} crabs`;
});

let lastTime = performance.now();
let crabCountFractional = 0;
let growthRate = 1;

const upgradeButtons: HTMLButtonElement[] = [];
const upgradeStatus: HTMLDivElement[] = [];

const purchaseContainer = document.createElement("div");
purchaseContainer.id = "purchase-container";
app.append(purchaseContainer);
//  Inspired from https://edmfong.github.io/cmpm-121-demo-1/ to move my puchasing options to the side of the screen

availableItems.forEach((item) => {
  const button = document.createElement("button");
  button.innerHTML = `Purchase ${item.name} (${item.price.toFixed(2)} crabs)`;
  button.disabled = true;
  button.title = item.description; // Add description as a tooltip
  purchaseContainer.append(button); // Append to the purchase container
  upgradeButtons.push(button);

  const status = document.createElement("div");
  status.innerHTML = `${item.name}: 0 purchased`;
  purchaseContainer.append(status); // Append to the purchase container
  upgradeStatus.push(status);

  function updateGrowthRateDisplay() {
    growthRateDisplay.innerHTML = `Growth rate: ${growthRate.toFixed(1)} crabs/sec`;
  }

  button.addEventListener("click", () => {
    if (crabCount >= item.price) {
      crabCount -= item.price;
      growthRate += item.productionRate;
      item.price *= 1.15;
      counter.innerHTML = `${crabCount} crabs`;
      status.innerHTML = `${item.name}: ${item.price.toFixed(2)} purchased`;
      button.innerHTML = `Purchase ${item.name} (${item.price.toFixed(2)} crabs)`;
      updateGrowthRateDisplay();
    }
  });
});

// Create the growth rate display
const growthRateDisplay = document.createElement("div");
growthRateDisplay.innerHTML = `Growth rate: 0 crabs/sec`;
app.append(growthRateDisplay);

function updateCounter() {
  const now = performance.now();
  const dt = now - lastTime;
  lastTime = now;

  crabCountFractional += (growthRate * dt) / 1000;
  if (crabCountFractional >= 1) {
    crabCount += Math.floor(crabCountFractional);
    crabCountFractional %= 1;
    counter.innerHTML = `${crabCount} crabs`;
  }

  // Enable or disable the purchase buttons based on the crab count
  availableItems.forEach((item, index) => {
    upgradeButtons[index].disabled = crabCount < item.price;
  });

  requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);
