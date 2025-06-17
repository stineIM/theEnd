let screen = document.getElementById("screen");
let result = document.getElementById("result");
let instructions = document.getElementById("instructions");

let startTime, endTime, timeout;
let topResults = [];

function reset() {
  screen.className = "waiting";
  instructions.textContent = "Click anywhere to start. Wait for green, then click!";
  result.textContent = "";
}

function startWaiting() {
  screen.className = "waiting";
  instructions.textContent = "Wait for green...";
  timeout = setTimeout(() => {
    screen.className = "ready";
    instructions.textContent = "CLICK!";
    screen.style.backgroundColor = "green";
    startTime = Date.now();
  }, Math.floor(Math.random() * 3000) + 2000);
}

function updateTopResults(time) {
  topResults.push(time);
  topResults.sort((a, b) => a - b);
  if (topResults.length > 5) topResults = topResults.slice(0, 5);

  let list = "Top 5 reaction times:<br>";
  topResults.forEach((t, i) => {
    list += `${i + 1}. ${t} ms<br>`;
  });
  result.innerHTML += "<br><br>" + list;
}

screen.addEventListener("click", () => {
  if (screen.className === "waiting") {
    clearTimeout(timeout);
    startWaiting();
  } else if (screen.className === "ready") {
    endTime = Date.now();
    let reactionTime = endTime - startTime;
    result.innerHTML = `Your reaction time: ${reactionTime} ms`;
    instructions.textContent = "Click to try again!";
    screen.className = "waiting";
    screen.style.backgroundColor = "#444";
    updateTopResults(reactionTime);
  } else {
    clearTimeout(timeout);
    screen.className = "tooSoon";
    instructions.textContent = "Too soon! Wait for green.";
    result.textContent = "";
    setTimeout(reset, 1000);
  }
});
