import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My fantastical game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Add a button
const button = document.createElement("button");
button.innerHTML = "🦀";
app.append(button);

//Add a <div> element to the page that will report on the value of a counter with a message like “12 cookies”
const counter = document.createElement("div");
counter.innerHTML = "0 ";
app.append(counter);

let crabCount = 0;

button.addEventListener("click", () => {
  crabCount++;
  counter.innerHTML = `${crabCount} crabs`;
});

// Make it so that the counter increments by 1 unit each second in addition to the increments coming from player clicks.
setInterval(() => {
  crabCount++;
  counter.innerHTML = `${crabCount} crabs`;
}, 1000);

// Make it so that the counter grows by a fractional amount per animation frame with a cumulative increase of 1 unit per second. (If we were animating about 60 frames per second, the counter should go up by 1/60 units per frame.)
// Implement this using requestAnimationFrame and remove your setTimeout implementation.

let lastTime = performance.now();
let crabCountFractional = 0;
let growthRate = 0;

// Create the purchase button
const purchaseButton = document.createElement("button");
purchaseButton.innerHTML = "Purchase Upgrade (10 crabs)";
purchaseButton.disabled = true;
document.body.appendChild(purchaseButton);

purchaseButton.addEventListener("click", () => {
  if (crabCount >= 10) {
    crabCount -= 10;
    growthRate += 1;
    counter.innerHTML = `${crabCount} crabs`;
  }
});

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

  // Enable or disable the purchase button based on the crab count
  purchaseButton.disabled = crabCount < 10;

  requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);
