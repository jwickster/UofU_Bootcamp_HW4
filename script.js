var startButton = document.getElementById("start-button");
var timeRemainingEl = document.getElementById("time-remaining");
var finalScore = document.getElementById("final-score");
var landingContainer = document.getElementById("landing-container");
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


//start quiz
function startQuiz() {
    var row = null;
    var col = null;
    var header = null;
    var button = null;
    var currentQuestion = 1;
    var score = 0;
    var clickTimeout = false;
    landingContainer.setAttribute("class", "container d-none");
    quizContainer.setAttribute("class", "container");


    //allocate 15 seconds per question 5 questions = 75 seconds
    timeRemaining = quizQuestions * 15;
    //Setting the value of an attribute on the specified element. https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
    timeRemainingEl.setAttribute("value", timeRemaining);

    var quizQuestionInterval = setInterval(function () {
        if (timeRemaining < 1) {
            clearInterval(quizQuestionInterval);
            //Setting the value of attribute quizContainer the specified element qualified name: "class" with a value "container d-none" .
            quizContainer.setAttribute("class", "container d-none");
            finalContainer.setAttribute("class", "container");

            return;
        }
        timeRemaining--;
        //setting the time remaining to qualified name value
        timeRemainingEl.setAttribute("value", timeRemaining);

    }, 1000); //1000 miliseconds = 1 second countdown 

}

function displayQuestion(questionNumber) {
    //initialize quiz container inner HTML elemments to ""
    quizContainer.innerHTML = "";
    var col = null;
    var row = null;


    //getting and setting attributes like a boss  then appending the question to row/column
    //https://www.w3schools.com/jsref/met_element_setattribute.asp 
    //https://www.w3schools.com/jsref/met_element_setattribute.asp
    row = document.createElement("div");
    row.setAttribute("class", "row");
    quizContainer.append(row);

    col = document.createElement("div");
    col.setAttribute("class", "col-0 col-sm-2");
    row.append(col);

    col = document.createElement("div");
    col.setAttribute("class", "col-12 col-sm-8");
    row.append(col);

    col = document.createElement("div");
    col.setAttribute("class", "col-0 col-sm-2");
    row.append(col);

    col = row.children[1];
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

        col = document.createElement("div");
        col.setAttribute("class", "col-12");
        row.append(col);

        //https://www.youtube.com/watch?v=Pkf1m4rVZw0
        button = document.createElement("button");
        button.setAttribute("class", "btn btn-danger");
        button.setAttribute("type", "button");
        button.innerHTML = questions[currentQuestion - 1].choices[i];
        colEl2.append(button);

        if (outOfTime) {
            return;
        } else {
            outOfTime = true;
        }

        clearInterval(quizQuestionInterval);
        col = quizContainer.children[0].children[1];
        row = document.createElement("div");
        row.setAttribute("class", "row border-top");
        col.append(row);

        col = document.createElement("div");
        col.setAttribute("class", "col-12");
        row.append(col);

        parEl = document.createElement("p");
        colEl.append(parEl);

        if (this.innerHTML === [currentQuestion - 1].answer) {
            parEl.innerHTML = "CORRECT";
        } else {
            parEl.innerHTML = "INCORRECT";
            timeRemaining = timeRemaining - 10;

            if (timeRemaining < 0) {
                alert("Time up!");
            }

            timeRemaining.setAttribute("value", timeRemaining);
        }
















    }

}