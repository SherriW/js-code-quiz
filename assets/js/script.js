// Variables: Reference DOM Elements
var startContentEl = document.querySelector("main");
var questionsEl = document.querySelector("questions");
var quizDoneEl = document.querySelector("done");
var timerEl = document.getElementById("timer");
var startBtn = document.getElementById("start-timer");

// Variables: Array of questions
// q: question; opt: options/choices; a: answer
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

// FUNCTIONS
// Timer that counts down based on number of questions & time allowed per question
function countdown() {
  var timeLeft = questionsArr.length * 15;
    // Display start available time 
    timerEl.textContent = timeLeft;

  // Call a function to be executed every 1 second
  var timeInterval = setInterval(function() {
    // Show remaining seconds if greater than 0
    if (timeLeft > 0) {
      // Decrement `timeLeft` by 1
      timeLeft--;      
      timerEl.textContent = timeLeft;

    // When last question is done
    } else if (questionNum === questions.length --) { 
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);

    // When 'timeLeft equals 0 or last question is done
    } else { 
      (timeLeft === 0);
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      timerEl.textContent
    }
  }, 1000);
}

// Start countdown when start button is clicked
startBtn.onclick = countdown;