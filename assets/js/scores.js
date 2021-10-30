// VARIABLES
// Reference DOM Elements
const mainSectionEl = document.querySelector("main");
const hScListEl = document.getElementById("score-list");

// High Scores Variables
// creates variable for parsed highScores array
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log("localStorage highScores", highScores);

// sets max number of scores to display
let MAX_LENGTH = 5;

// FUNCTIONS
// High Scores Display
function hScDisplay() {
// if highScores in localStorage
  // loop/iterate over highScores list
  if (highScores > "") {
    for (let i = 0; i < MAX_LENGTH; i++) {
      let hScEl = document.createElement("div");
      hScEl.setAttribute("class", "list");
      hScEl.textContent = i + 1 + ". " + highScores[i].lsInit + " - " + highScores[i].lsScore;
      hScListEl.appendChild(hScEl);
    }  
  }
};

// sort scores, high to low
highScores = highScores.sort((a, b) => {
  return b.lsScore - a.lsScore;
  });
  console.log(hScListEl);
  
// remove scores over max length from localStorage
console.log(highScores);
if (highScores.length > MAX_LENGTH) {
  let removed = highScores.splice(MAX_LENGTH);
  console.log(highScores);
  console.log(removed);
  removed = "";
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

// CALL BUTTON FUNCTIONS
function btnClick(buttonClicks) {
  let btnEl = buttonClicks.target;

  // starts quiz over
  if (btnEl.matches("#start-over")) {
    window.location.href = "index.html";
  }

  // clears high scores in localStorage
  else if (btnEl.matches("#clear-scores")) {
    localStorage.clear();
    location.reload();
  }
};

// EVENT LISTENER
mainSectionEl.addEventListener("click", btnClick);

// CALL HIGHSCORE FUNCTION
hScDisplay();