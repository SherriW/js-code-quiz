// VARIABLES
// Reference DOM Elements
var bodyEl = document.querySelector("body");
var mainSectionEl = document.querySelector("main");
var contentSectionEl = document.querySelector(".content");
var startContentEl = document.getElementById("start");
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start-timer");
var doneEl = document.getElementById("done");

// Question Variables
var questionNum = 0;

//question array variable
var questionsArr = [ {
  q: "Commonly used data types DO Not Include:",
  opt: ["strings", "booleans", "alerts", "numbers"],
  a: 2
},{
  q: "The condition in an if / else statement is enclosed with _____.",
  opt: ["quotes","curly brackets","parenthesis","square brackets"],
  a: 2 
}, {
  q: "Arrays in JavaScript can be used to store",
  opt: ["numbers and strings","other arrays","booleans","all of the above"],
  a: 3
}, {
  q: "String values must be enclosed within _____ when being assigned to variables.",
  opt: ["commas","curly brackets","quotes","parenthesis"],
  a: 2
}, {
  q: "A very useful tool used during development and debugging for printing content to the debugger is:",
  opt: ["JavaScript","terminal/bash","for loops","console.log"],
  a: 3
} ];

// Timer Variables
var timeLeft = questionsArr.length *15;
var penalty = 15;

// FUNCTIONS
// Coundown Timer - based on number of questions & time allowed per question
function countdown() {
  // call function to be executed every 1 second
  var timeInterval = setInterval(function() {

    // when last question is done, stops timer and calls All Done
    if (questionNum === questionsArr.length) {
      clearInterval(timeInterval);
    }
    // time left, decrement by 1
    else if (timeLeft > 0) {
      timeLeft--;
      timerEl.textContent = timeLeft;
    }
    // stops timer and sets time left to 0, when reaches 0
    else{
      timeLeft === 0;
      clearInterval(timeInterval);      
      timerEl.textContent = timeLeft;
      qDisplayEl.remove();
      allDone();
    }
  }, 1000);
};

// Display questions
function displayQuestions() {
  // variable to reference content section
  var content = document.querySelector(".content");

  // create elements for questions display
  qDisplayEl = document.createElement("div");
  var qh1El = document.createElement("h1");
 
  //set element attributes
  qDisplayEl.className = "q";
  qh1El.innerText = questionsArr[questionNum].q;

  // append elements
  content.appendChild(qDisplayEl);
  qDisplayEl.appendChild(qh1El);

  // loop over questions
  for (var i = 0; i < questionsArr[questionNum].opt.length; i++) {
    // Display answer options
    var optBtnEl = document.createElement ("button");
      optBtnEl.className = "btn opt-btn";
      optBtnEl.setAttribute("id", i);
      optBtnEl.innerText = (i+1) + ". " + questionsArr[questionNum].opt[i];
    qDisplayEl.appendChild(optBtnEl);
  }
};

// Compare User Option to Answer
function compareOpt2A(btnEl) {
  // change id of option button to integer for comparison
  optNum = parseInt(btnEl.id);
  // check for correct option selection and track time/score
  if (optNum === questionsArr[questionNum].a) {
    // set status of choice for correct
    var choiceStatus = true;
    displayMsg(choiceStatus);
  }
  else {
    // set status of choice for wrong
    choiceStatus = false;
    displayMsg(choiceStatus);    
    // subtract time for wrong answer
    timeLeft -= 15;
    // display 0 if timeLeft is 0 or less
    if (timeLeft < 1) {
    timeLeft = 0;
    } else {
      timeLeft;
    }
    // display time left due after penalty 
    timerEl.textContent = timeLeft;      
  }
  next();
};
// console.log("user choice was ", choiceStatus);

// Next Question
function next() {
  // remove last question
  qDisplayEl.remove();

  // check for next question
  questionNum++;

  // no questions left, go to All Done display  
  if (questionNum === questionsArr.length) {
    allDone();
    displayMsg;
  // if questions, continue loop to next question
  } else {
    displayQuestions();
  }
};

// Display Status of User Choice
var displayMsg = function(choiceStatus) {
  // set message
  var msgTxt = choiceStatus
    if (choiceStatus) {
      msgTxt = "Correct!";
    } else {
      msgTxt = "Wrong!";
    }

  // create elements and set attributes for message
  var statusEl = document.createElement("footer");
  var optMsgEl = document.createElement("h3");
    optMsgEl.innerText = msgTxt;
  
    // append elements
    bodyEl.appendChild(statusEl);
    statusEl.appendChild(optMsgEl);

    // function shows message for 1 sec
    setTimeout(function () {
      statusEl.remove();
    }, 1000);  
};

// All Done Display
function allDone() {
  doneEl.removeAttribute("class");
  var pDone = document.getElementById("ad-p");
  // create element/attributes & append
  var pEl = document.createElement("p");
    pEl.innerText = "Your final score is " + timeLeft + ".";
    pDone.appendChild(pEl);
};

// Save highScores to Local Storage
function saveValues() { 
  // gets input element
  let initEl = document.getElementById("initials");
  // console.log("input initials", initEl.value);

  // creates variable for highScores array
  let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  console.log("parsed localStorage highScores", highScores);

  // sets new object content (initials and score)
  let newScoreObj = {lsInit: initEl.value, lsScore: timeLeft};
  // console.log("new Score Obj", newScoreObj);

  let matchLsInit = highScores.findIndex(highScores => highScores.lsInit === initEl.value)
  console.log(matchLsInit);

  // if input has no value, alert user
  if (!initEl.value) {
    alert("Please enter your initials and Re-Submit");

  // localStorage highScore array has value 
  } else if ((highScores > "") && (matchLsInit >= 0)) {
    console.log("has data");

    // set index for initials match: input vs highScores array
    let index = highScores.findIndex(highScores => highScores.lsInit === initEl.value)
    console.log("index of match", index);

    // if new score is greater than older score, remove and replace
    if ((highScores[index].lsScore) < newScoreObj.lsScore) {
      console.log("high score is less than input")
      console.log("index lsScore compare", index);
      if (index >= 0) {highScores.splice(index, 1)} {    
        highScores.push(newScoreObj);
        console.log("new highScores", highScores);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        hScDisplay();
        }
    
    // if existing score is >= to new score, move to highScores display
    } else {
      console.log("high score greater than or equal to input")
      console.log("highScores index", highScores[index]);
      hScDisplay();
    }

  // if no value in array or new user   
  } else if (matchLsInit < 0) {
    console.log("new user");
    highScores.push(newScoreObj);
    console.log("new user Obj", newScoreObj);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    hScDisplay();
    console.log("new user score", highScores);
  }
};

// highScores display
function hScDisplay() {
  // display high-score.html
  window.location.href = "high-score.html";    
}

// CALL BUTTON FUNCTIONS
function btnClick(buttonClicks) {
  var btnEl = buttonClicks.target;

  // remove div/display, start questions & timer
  if (btnEl.matches("#start-timer")) {
    startContentEl.remove();
    displayQuestions();
    countdown();
  }

  // checks answer based on option clicked
  else if (btnEl.matches(".opt-btn")) {
    compareOpt2A(btnEl);
  }

  // submits scores to localStorage
  else if (btnEl.matches("#submit-btn")) {
    saveValues();
}

  // starts quiz over
  else if (btnEl.matches("#start-over")) {
    window.location.href = "index.html";
  }

  // clears high scores in localStorage
  else if (btnEl.matches("#clear-scores")) {
    localStorage.clear()
  }
};

// EVENT LISTENER
contentSectionEl.addEventListener("click", btnClick);