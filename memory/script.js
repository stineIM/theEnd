const board = document.getElementById("gameBoard");
const status = document.getElementById("status");

let emojis = ["😀", "🎮", "🚀", "🌈", "🎧", "🐱", "🍕", "🏆"];
let cards = [...emojis, ...emojis]; // duplicate to make pairs
cards.sort(() => 0.5 - Math.random());

let flippedCards = [];
let matchedCount = 0;
let attempts = 0;
let startTime = Date.now();
let timerInterval;
let topScores = [];

function startTimer() {
  const timerDisplay = document.createElement("p");
  timerDisplay.id = "timer";
  status.before(timerDisplay);
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Time: ${elapsed}s | Attempts: ${attempts}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").remove();
}

function updateLeaderboard(time, attempts) {
  topScores.push({ time, attempts });
  topScores.sort((a, b) => a.time - b.time || a.attempts - b.attempts);
  if (topScores.length > 5) topScores = topScores.slice(0, 5);

  let output = "<br><strong>🏅 Top 5 Scores:</strong><br>";
  topScores.forEach((score, i) => {
    output += `${i + 1}. Time: ${score.time}s, Attempts: ${score.attempts}<br>`;
  });
  status.innerHTML += output;
}

cards.forEach((emoji, index) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.emoji = emoji;
  card.dataset.index = index;

  card.addEventListener("click", () => {
    if (!timerInterval) startTimer();
    if (
      card.classList.contains("flipped") ||
      flippedCards.length === 2 ||
      card === flippedCards[0]
    ) {
      return;
    }

    card.textContent = emoji;
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      attempts++;
      const [first, second] = flippedCards;
      if (first.dataset.emoji === second.dataset.emoji) {
        matchedCount++;
        flippedCards = [];
        if (matchedCount === emojis.length) {
          const totalTime = Math.floor((Date.now() - startTime) / 1000);
          stopTimer();
          status.innerHTML = `🎉 You found all pairs in ${totalTime} seconds and ${attempts} attempts!`;
          updateLeaderboard(totalTime, attempts);
        }
      } else {
        setTimeout(() => {
          first.textContent = "";
          second.textContent = "";
          first.classList.remove("flipped");
          second.classList.remove("flipped");
          flippedCards = [];
        }, 1000);
      }
    }
  });

  board.appendChild(card);
});
