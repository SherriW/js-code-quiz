// VARIABLES
// Reference DOM Elements
var mainSectionEl = document.querySelector("main");
var contentSectionEl = document.querySelector(".content");
var startContentEl = document.getElementById("start");
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start-timer");

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
      // use 'clearInterval()' to stop the timer
      clearInterval(timeInterval);
      allDone();
    }
    // time left, decrement by 1
    else if (timeLeft > 0) {
      timeLeft--;
      timerEl.textContent = timeLeft;
    }
    // stops timer and sets time left to 0, when reaches 0
    else{
      timerEl.textContent = timeLeft;
      clearInterval(timeInterval);
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
  qDisplayEl.setAttribute("id", "q");
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
    // display time left due after penalty 
    timerEl.textContent = timeLeft;      
  }
  next();
};
// console.log(choiceStatus);

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

// CALL FUNCTIONS
function btnClick(buttonClicks) {
  var btnEl = buttonClicks.target;

  // remove div/display, start questions & timer
  if (btnEl.matches("#start-timer")) {
    startContentEl.remove();
    displayQuestions();
    countdown();
  }

  // Checks answer based on option clicked
  else if (btnEl.matches(".opt-btn")) {
    compareOpt2A(btnEl);
  }
};

// EVENT LISTENER
contentSectionEl.addEventListener("click", btnClick);