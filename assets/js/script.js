// VARIABLES
// Reference DOM Elements
var contentSectionEl = document.querySelector(".content");
var startContentEl = document.getElementById("start");
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start-timer");
var optMsgEl = document.getElementById("option-msg");

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
}
];

// Timer Variables
var timeLeft = questionsArr.length *15;
var timerInterval;
var penalty = 15;

// FUNCTIONS
// Coundown Timer - based on number of questions & time allowed per question
function countdown() {
    // display start available time 
    timerEl.textContent = timeLeft;

  // call function to be executed every 1 second
    timerInterval = setInterval(function() {
    // show remaining seconds if greater than 0
    if (timeLeft > 0) {
      // Decrement `timeLeft` by 1
      timeLeft--;      
      timerEl.textContent = timeLeft;

    // when last question is done
    } else if (questionNum === questionsArr.length --) { 
      // Use `clearInterval()` to stop the timer
      clearInterval(timerInterval);

    // when 'timeLeft equals 0 or last question is done
    } else { 
      (timeLeft === 0);
      // use `clearInterval()` to stop the timer
      clearInterval(timerInterval);

      // display All Done
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
  var qTitleEl = document.createElement("h1");
 
  //set element attributes
  qDisplayEl.className = "q";
  qDisplayEl.setAttribute("id", "q");
  qTitleEl.innerText = questionsArr[questionNum].q;

  // append elements
  content.appendChild(qDisplayEl);
  qDisplayEl.appendChild(qTitleEl);

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

  // look for correct option selection
  if (optNum === questionsArr[questionNum].a) {
    // set status of choice for correct
    choiceStatus = true;
  }
  else{
    // subtract time for wrong answer
    timeLeft -= 15;
    console.log(timeLeft);

    // if time left is less than or equal to 0, set to 0 & end
    if (timeLeft < 0) {
      timerEl.textContent = 0;
    }
    else {
    // display time left due after penalty 
    timerEl.textContent = timeLeft;      
    }
  
  // setup to display option selection status
    // if wrong
    var choiceStatus = false;
  //  optMsgEl(choiceStatus);
  }
  console.log(choiceStatus);
  next();
};

// Next Question
function next() {
  // remove last question
  qDisplayEl.remove();

  // check for next question
  questionNum++;

  // no questions left, go to All Done display  
  if (questionNum === questionsArr.length) {
    allDone();
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