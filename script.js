let isDebugged = false;

function debugMessage() {
  const message = document.getElementById("message");
  message.classList.remove("fade");
  void message.offsetWidth;
  message.classList.add("fade");

  if (!isDebugged) {
    message.innerHTML = `
      <p class="debugged">Gratulerer – de har nesten overlevd eit år med bugs, feilmeldingar og sporadiske oppdateringar frå læraren!</p>
      <p class="debugged">De har lært å omgå systemet, google betre enn AI, og sjå travle ut mens PC-en restartar.</p>
      <p class="debugged">Nokre av dykk skal ut i lære og få ansvar for alt – men ingen rettar til å endre noko. Andre skal på påbygg og løyse problem utan internett.</p>
      <p class="debugged">Hugs: ekte IT-drift betyr at du kan finne feil i andre sitt arbeid og late som det er “brukarfeil”.</p>
      <p class="footer debugged">
        PS: Kaka inneheld inga JavaScript – berre sukker. Nyt ho! 🍰<br><br>
        Alt godt,<br>
        [Namnet ditt]
      </p>
    `;
    isDebugged = true;
  }
}

function toggleTheme() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
}

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "I tried to make a joke about UDP... but you might never get it.",
  "Why do Java developers wear glasses? Because they can’t C#.",
  "How many programmers does it take to change a light bulb? None – it’s a hardware problem.",
  "There are 10 types of people in the world: those who understand binary, and those who don’t.",
  "Why did the two Java methods get a divorce? Because they had constant arguments.",
  "Why did the edge server go bankrupt? Because it ran out of cache.",
  "Knock, knock. Who’s there? ... Java. (pause for loading...)",
  "How did the programmer die in the shower? He read the shampoo bottle instructions: Lather. Rinse. Repeat.",
  "An SQL statement walks into a bar and sees two tables. It approaches and asks, ‘May I join you?’"
];

function showFunFact() {
  const funFactBox = document.getElementById("fun-fact");
  const randomIndex = Math.floor(Math.random() * jokes.length);
  funFactBox.innerHTML = `<div class="joke-box">${jokes[randomIndex]}</div>`;
}
