"use strict";

function initQuiz() {
  var startButton = document.getElementById("start-button");
  var remainingTime = document.getElementById("time-remaining");
  var finalScore = document.getElementById("final-score");
  var homeContainer = document.getElementById("landing-container");
  var quizContainer = document.getElementById("quiz-container");
  var finalContainer = document.getElementById("final-container");
  var submitButton = document.getElementById("submit-initials");
  var highscoreButton = document.getElementById("highscore-button");
  var highscoreContainer = document.getElementById("highscore-container");
  startButton.addEventListener("click", startQuiz);
  var quizQuestions = questions.length;
  var highScores = [];
  var timeRemaining = 0;
  var outOfTime = false;

  if (JSON.parse(localStorage.getItem("scores")) !== null) {
    highScores = JSON.parse(localStorage.getItem("scores"));
  }
} //start quiz


function startQuiz() {
  homeContainer.setAttribute("class", "container d-none");
  quizContainer.setAttribute("class", "container");
  var score = 0;
  var currentQuestion = 1;
  var row = null;
  var col = null;
  var header = null;
  var button = null;
  timeRemaining = quizQuestions * 15;
  homeContainer.setAttribute("class", remainingTime);
  var myInterval = setInterval(function () {
    if (timeRemaining < 1) {
      clearInterval(myInterval);
      var currentQuestion = 1;
      quizContainer.setAttribute("class", "container");
      finalContainer.setAttribute("class", "container");
      return;
    }

    timeRemaining = timeRemaining - 1;
    remainingTime.setAttribute("value", timeRemaining);
  }, 1000);
}

function generateQuestion() {}

function saveHighScore() {
  landingContainer.setAttribute("class", "container");
}