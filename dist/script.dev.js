"use strict";

function initializeQuiz() {
  //   Linking elements to variables
  var startButtonEl = document.getElementById("start-button");
  var timeRemainingEl = document.getElementById("time-remaining");
  var finalScoreEl = document.getElementById("final-score");
  var landingContainerEl = document.getElementById("landing-container");
  var quizContainerEl = document.getElementById("quiz-container");
  var finalContainerEl = document.getElementById("final-container");
  var submitButtonEl = document.getElementById("submit-initials");
  var highscoreButtonEl = document.getElementById("highscore-button");
  var highscoreContainerEl = document.getElementById("highscore-container"); //initializations

  var highScores = [];
  var numQuestions = questions.length;
  var timeRemaining = 0;

  if (JSON.parse(localStorage.getItem("scores")) !== null) {
    highScores = JSON.parse(localStorage.getItem("scores"));
  }

  function startQuiz() {
    landingContainerEl.setAttribute("class", "container d-none");
    var rowEl = null;
    var colEl = null;
    var headerEl = null;
    var buttonEl = null;
    quizContainerEl.setAttribute("class", "container");
    var currentQuestion = 1;
    var score = 0;
    timeRemaining = numQuestions * 15;
    timeRemainingEl.setAttribute("value", timeRemaining);
    var myInterval = setInterval(function () {
      if (timeRemaining < 1) {
        clearInterval(myInterval);
        quizContainerEl.setAttribute("class", "container d-none");
        finalContainerEl.setAttribute("class", "container");
        return;
      }

      timeRemaining = timeRemaining - 1;
      timeRemainingEl.setAttribute("value", timeRemaining);
    }, 1000);
    var clickTimeout = false;

    function generateQuestion(questionNum) {
      quizContainerEl.innerHTML = "";
      rowEl = document.createElement("div");
      rowEl.setAttribute("class", "row");
      quizContainerEl.append(rowEl);
      colEl = document.createElement("div");
      colEl.setAttribute("class", "col-0 col-sm-2");
      rowEl.append(colEl);
      colEl = document.createElement("div");
      colEl.setAttribute("class", "col-12 col-sm-8");
      rowEl.append(colEl);
      colEl = document.createElement("div");
      colEl.setAttribute("class", "col-0 col-sm-2");
      rowEl.append(colEl);
      colEl = rowEl.children[1];
      rowEl = document.createElement("div");
      rowEl.setAttribute("class", "row mb-3");
      colEl.append(rowEl);
      colEl = document.createElement("div");
      colEl.setAttribute("class", "col-12");
      rowEl.append(colEl);
      headerEl = document.createElement("h2");
      headerEl.innerHTML = questions[questionNum - 1].title;
      colEl.append(headerEl);
      colEl = quizContainerEl.children[0].children[1];

      for (var _i = 0; _i < 4; _i++) {
        var _rowEl = document.createElement("div");

        _rowEl.setAttribute("class", "row mb-5");

        colEl.append(_rowEl);
        var colEl2 = document.createElement("div");
        colEl2.setAttribute("class", "col-8");

        _rowEl.append(colEl2);

        buttonEl = document.createElement("button");
        buttonEl.setAttribute("class", "btn btn-primary");
        buttonEl.setAttribute("type", "button");
        buttonEl.innerHTML = questions[currentQuestion - 1].choices[_i];
        colEl2.append(buttonEl); ////////

        buttonEl.addEventListener("click", function () {
          if (clickTimeout) {
            return;
          }

          clickTimeout = true;
          clearInterval(myInterval);
          var colEl = quizContainerEl.children[0].children[1];
          var rowEl = document.createElement("div");
          rowEl.setAttribute("class", "row border-top");
          colEl.append(rowEl);
          colEl = document.createElement("div");
          colEl.setAttribute("class", "col-12");
          rowEl.append(colEl);
          var parEl = document.createElement("p");
          colEl.append(parEl);

          if (this.innerHTML === questions[currentQuestion - 1].answer) {
            parEl.innerHTML = "Correct!";
          } else {
            parEl.innerHTML = "Incorrect";
            timeRemaining = timeRemaining - 10;

            if (timeRemaining < 0) {
              timeRemaining = 0;
            }

            timeRemainingEl.setAttribute("value", timeRemaining);
          }

          currentQuestion++;

          if (currentQuestion > questions.length) {
            score = timeRemaining;
          }

          setTimeout(function () {
            if (currentQuestion > questions.length) {
              quizContainerEl.setAttribute("class", "container d-none");
              finalContainerEl.setAttribute("class", "container");
              finalScoreEl.setAttribute("value", score);
            } else {
              generateQuestion(currentQuestion);
              clickTimeout = false;
              myInterval = setInterval(function () {
                if (timeRemaining < 1) {
                  clearInterval(myInterval);
                  quizContainerEl.setAttribute("class", "container d-none");
                  finalContainerEl.setAttribute("class", "container");
                  return;
                }

                timeRemaining = timeRemaining - 1;
                timeRemainingEl.setAttribute("value", timeRemaining);
              }, 1000);
            }
          }, 2000);
        }); ///////
      }
    }

    function saveHighScore() {
      var initialsEl = document.getElementById("initials-entry");
      var newHighScore = {
        initials: initialsEl.value,
        highScore: score
      };
      console.log(newHighScore); //debugging

      highScores.push(newHighScore);
      console.log(highScores);
      localStorage.setItem("scores", JSON.stringify(highScores));
    }

    submitButtonEl.addEventListener("click", saveHighScore);
    generateQuestion(currentQuestion);
  }

  startButtonEl.addEventListener("click", startQuiz);
  highscoreButtonEl.addEventListener("click", function () {
    landingContainerEl.setAttribute("class", "container d-none");
    quizContainerEl.setAttribute("class", "container d-none");
    finalContainerEl.setAttribute("class", "container d-none");
    highscoreContainerEl.setAttribute("class", "container");
    var colEl = document.getElementById("highscore-table");

    for (i = 0; i < highScores.length; i++) {
      var rowEl = document.createElement("div");
      rowEl.setAttribute("class", "row mb-1");
      colEl.append(rowEl);
      var colEl2 = document.createElement("div");
      colEl2.setAttribute("class", "col-12 text-center");
      rowEl.append(colEl2);
      var parEl = document.createElement("div");
      parEl.innerHTML = "Initials: " + highScores[i].initials + "   Score: " + highScores[i].highScore;
      colEl2.append(parEl);
    }
  });
}

initializeQuiz();