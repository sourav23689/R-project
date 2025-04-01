/*-------------------------------- Constants --------------------------------*/
const startingScore = 0;
const jeopardyAudio = new Audio("../assets/Jeopardy-theme-song.mp3");

/*---------------------------- Variables (state) ----------------------------*/
let presentQuestionIndex = 0;
let score = startingScore;
let feedback = "";
let showResults = false;
let finalResultMessage = "";

/*------------------------ Cached Element References ------------------------*/
const startScreenElement = document.getElementById("start-screen")
const startButtonElement = document.getElementById("start-button")

const gameScreenElement = document.getElementById("game-screen")
const quizDiv = document.getElementById("quiz");

const questionElement = document.getElementById("question");
const feedbackElement = document.getElementById("feedback");

const trueBtnElement = document.getElementById("true");
const falseBtnElement = document.getElementById("false");
const nextBtnElement = document.getElementById("next-button");

const resultElement = document.getElementById("resultElement");
const scoreElement = document.getElementById("score");

const playAgainButton = document.getElementById("play-again-btn");
const finalResultMessageElement = document.getElementById(
  "final-result-message"
);


/*-------------------------------- Functions --------------------------------*/

const questions = [
  {
    question:
      "The human body has 220 bones?",
    correctAnswer: false,
  },
  {
    question: "Sounds travels faster in water than in air?",
    correctAnswer: true,
  },
  {
    question:
      "Venus is the hottest planet in our solar system?",
    correctAnswer: true,
  },
  {
    question: "Sharks are mammals?",
    correctAnswer: false,
  },
  {
    question:
      "The united states declared independence in 1776?",
    correctAnswer: true,
  },
  {
    question:
      "Russia is the largest country by the land area?",
    correctAnswer: true,
  },
  {
    question:
      "The olympic games originated in ancient rome?",
    correctAnswer: false,
  },
];

const startGame = () => {
    startScreenElement.classList.add("hidden")
    gameScreenElement.classList.remove("hidden")
}

const init = () => {
  jeopardyAudio.play();
  jeopardyAudio.loop = true;
  jeopardyAudio.volume = 0.2;
  presentQuestionIndex = 0;
  score = startingScore;
  feedback = "";
  showResults = false;
  finalResultMessage = "";
  feedbackElement.textContent = ""
  quizDiv.classList.remove("hidden");
  resultElement.classList.add("hidden")
  playAgainButton.classList.add("hidden")
  render();
};

const render = () => {
  if (showResults) {
    gameScreenElement.classList.add("hidden")
    quizDiv.classList.add("hidden");
    resultElement.classList.remove("hidden");
    scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
    finalResultMessageElement.textContent =
      score >= 4 ? "Congratulations, well played!" : "Better luck next time!";
    playAgainButton.classList.remove("hidden");
    trueBtnElement.classList.add("hidden");
    falseBtnElement.classList.add("hidden");
    nextBtnElement.classList.add("hidden");
  
} else {
    quizDiv.classList.remove("hidden");
    resultElement.classList.add("hidden");
    playAgainButton.classList.add("hidden");
    const presentQuestion = questions[presentQuestionIndex];
    questionElement.textContent = presentQuestion.question;
    nextBtnElement.disabled = feedback === "";
    trueBtnElement.classList.remove("hidden");
    falseBtnElement.classList.remove("hidden")
    nextBtnElement.classList.remove("hidden")
  }
};

const processAnswer = (participantAnswer) => {
  const presentQuestion = questions[presentQuestionIndex];
  if (participantAnswer === presentQuestion.correctAnswer) {
    feedback = "Correct!";
    score = score + 1;
  } else {
    feedback = "Incorrect!";
  }

  feedbackElement.textContent = feedback;
  nextBtnElement.disabled = false;
  render();
};

const nextQuestion = () => {
  presentQuestionIndex += 1;
  if (presentQuestionIndex < questions.length) {
    feedback = "";
    feedbackElement.textContent = "";
  } else {
    showResults = true;
  }
  render();
};


const trueButtonClick = () => {
  processAnswer(true);
};

const falseButtonClick = () => {
  processAnswer(false);
};

const playAgain = () => {
    jeopardyAudio.pause();
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("game-screen").classList.add("hidden");
    resultElement.classList.add("hidden");
    playAgainButton.classList.add("hidden"); 
    presentQuestionIndex = 0;
    score = startingScore;
    feedback = "";
    showResults = false;
    finalResultMessage = "";
  init();
};

init();

/*----------------------------- Event Listeners -----------------------------*/
startButtonElement.addEventListener("click", startGame);
trueBtnElement.addEventListener("click", trueButtonClick);
falseBtnElement.addEventListener("click", falseButtonClick);
nextBtnElement.addEventListener("click", nextQuestion);
playAgainButton.addEventListener("click", playAgain);



