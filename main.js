const app = document.getElementById("app");
const resultDiv = document.getElementById("second-div");
const playButton = document.getElementById("play-button");

const container = document.createElement("div");
container.classList.add("container");
app.append(container);

const header = document.createElement("h2");
header.textContent = "Basketball Game";
container.append(header);

const instructions = document.createElement("p");
instructions.textContent = "Instructions: Enter player name.";
container.append(instructions);

const label = document.createElement("p");
label.textContent = "Current Basketball Player";
container.append(label);

const toDoControls = document.createElement("div");
toDoControls.classList.add("input-group", "mb-3");
container.append(toDoControls);

const input = document.createElement("input");
input.id = "text-todo";
input.classList.add("form-control");
input.placeholder = "Enter name";
toDoControls.append(input);

const addPlayer = document.createElement("button");
addPlayer.classList.add("btn", "btn-primary");
addPlayer.textContent = "Add";
toDoControls.append(addPlayer);

const toDoList = document.createElement("ul");
toDoList.id = "todo-list";
toDoList.classList.add("list-group", "pt-3");
container.append(toDoList);

const errorMessage = document.createElement("p");
errorMessage.id = "error-message";
errorMessage.style.color = "red";
errorMessage.style.display = "none";
container.append(errorMessage);

const playerNames = [];

addPlayer.addEventListener("click", () => {
  const playerName = input.value.trim();
  if (playerName === "") return;

  const newItem = document.createElement("li");
  newItem.classList.add("list-group-item");
  newItem.textContent = playerName;
  toDoList.append(newItem);

  playerNames.push(playerName);
  input.value = "";
  errorMessage.style.display = "none";
});

let round = 1;
const attempts = 5;
const successRate = 0.5;

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
}

function rate() {
  return Math.random();
}

function game(players) {
  players.forEach(player => {
    player.score = 0;
    for (let i = 0; i < attempts; i++) {
      if (rate() > successRate) {
        player.score++;
      }
    }
  });
}
function gameResults(players, isTiebreaker = false) {
  if (round === 1 && !isTiebreaker) {
    const elementsToRemove = Array.from(resultDiv.children).filter(
      child => !['H2', 'BUTTON'].includes(child.tagName)
    );
    elementsToRemove.forEach(el => el.remove());
  
    const roundsContainer = document.createElement("div");
    roundsContainer.id = "rounds-container";
    const playButton = resultDiv.querySelector("button");
    resultDiv.insertBefore(roundsContainer, playButton);
  }

  const gameResultDiv = document.createElement("div");
  gameResultDiv.classList.add("round-result");
  
  gameResultDiv.style.backgroundColor = round % 2 === 1 ? "#f0f8ff" : "#fff0f8";
  gameResultDiv.style.margin = "10px 0";
  gameResultDiv.style.padding = "15px";
  gameResultDiv.style.borderRadius = "5px";
  gameResultDiv.style.border = "1px solid #ddd";

  const roundTitle = document.createElement("h4");
  roundTitle.textContent = `🏀 ROUND ${round}`;
  gameResultDiv.appendChild(roundTitle);

  players.sort((a, b) => b.score - a.score);
  players.forEach((player, index) => {
    const p = document.createElement("p");
    p.textContent = `${index + 1}. ${player.name}: ${player.score} points`;
    gameResultDiv.appendChild(p);
  });

  const winnerScore = players[0].score;
  const tieBreaker = players.filter(p => p.score === winnerScore);

  if (tieBreaker.length > 1) {
    const tieMsg = document.createElement("p");
    tieMsg.innerHTML = `🔥 Tiebreaker needed between: <strong>${tieBreaker.map(p => p.name).join(", ")}</strong>`;
    gameResultDiv.appendChild(tieMsg);
    
    document.getElementById("rounds-container").appendChild(gameResultDiv);
    
    round++;
    game(tieBreaker);
    gameResults(tieBreaker, true); 
  } else {
    const winnerMsg = document.createElement("h5");
    winnerMsg.innerHTML = `🏆 The champion is <strong>${players[0].name}</strong> with <strong>${players[0].score}</strong> points!`;
    gameResultDiv.appendChild(winnerMsg);
    document.getElementById("rounds-container").appendChild(gameResultDiv);
  }
}

playButton.addEventListener("click", () => {
  if (playerNames.length <= 1) {
    errorMessage.textContent = "You need at least 2 players to start the game!";
    errorMessage.style.display = "block";
    return;
  }

  round = 1;
  
  const players = playerNames.map(name => new Player(name));
  game(players);
  gameResults(players);
});