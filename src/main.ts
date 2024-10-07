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
