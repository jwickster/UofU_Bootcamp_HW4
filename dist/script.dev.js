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
  } //start quiz


  function startQuiz() {
    homeContainer.setAttribute("class", "container d-none");
    quizContainer.setAttribute("class", "container");
    var lockedOut = false;
    var score = 0;
    var currentQuestion = 1;
    var row = null;
    var col = null;
    var header = null;
    var button = null;
    timeRemaining = quizQuestions * 15;
    homeContainer.setAttribute("class", remainingTime); //https://www.javascripttutorial.net/javascript-dom/javascript-setattribute/
    //https://www.youtube.com/watch?v=yc-AeIdRVEI

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
    /*
    Nested function to generate questions to the DOM Couldnt do concurrent
    function calls so logic being fire off a generate Questions function while
    quiz is being initialized by the DOM
    */

    function generateQuestion(questionNumber) {
      quizContainer.innerHTML = "";
      row = document.createElement("div");
      row = setAttribute("class", "row");
      quizContainer.append(row);
      col = document.createElement("div");
      col.setAttribute("class", "col-0 col-sm-2");
      row.append(col);
      col = document.createElement("div");
      col.setAttribute("class", "col-0 col-sm-2");
      row.append(col); //////

      col = document.createElement("div");
      col.setAttribute("class", "col-12 col-sm-8");
      row.append(col);
      col = document.createElement("div");
      col.setAttribute("class", "col-0 col-sm-2");
      row.append(col);
      col = rowEl.children[1];
      row = document.createElement("div");
      row.setAttribute("class", "row mb-3");
      col.append(row);
      col = document.createElement("div");
      col.setAttribute("class", "col-12");
      row.append(col);
      header = document.createElement("h2");
      header.innerHTML = questions[questionNum - 1].title;
      col.append(header);
      col = quizContainer.children[0].children[1];

      for (var i = 0; i < 4; i++) {
        row = document.createElement("div");
        row.setAttribute("class", "row mb-1");
        col.append(row);
      }
    }
  }

  startButton.addEventListener("click", startQuiz);
}