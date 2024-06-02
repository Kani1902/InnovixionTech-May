const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "A) Hyper Text Markup Language", correct: true },
      { text: "B) High Tech Markup Language", correct: false },
      { text: "C) Hyperlinks and Text Markup Language", correct: false },
      { text: "D) Home Tool Markup Language", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a valid HTML tag?",
    answers: [
      { text: "A) header", correct: false },
      { text: "B) section", correct: false },
      { text: "C) div", correct: false },
      { text: "D) paragraph", correct: true },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "A) Computer Style Sheets", correct: false },
      { text: "B) Cascading Style Sheets", correct: true },
      { text: "C) Creative Style Sheets", correct: false },
      { text: "D) Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "Which of the following is NOT a valid data type in JavaScript?",
    answers: [
      { text: "A) String", correct: false },
      { text: "B) Boolean", correct: false },
      { text: "C) Array", correct: false },
      { text: "D) Float", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
const totalTime = 20;
let timeRemaining = totalTime;
let timerInterval; // Declare timer interval variable

function startQuiz() {
  currentQuestionIndex = 0; // Reset question index
  score = 0;
  nextButton.innerHTML = "Next";
  resetState(); // Reset answer buttons and hide next button

  // Reset timer
  timeRemaining = totalTime;
  document.getElementById('timer').innerText = `Time Remaining: ${timeRemaining} seconds`;

  // Start the countdown timer
  startTimer();

  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function startTimer() {
  // Clear any existing timer
  clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeRemaining--;
    document.getElementById('timer').innerText = `Time Remaining: ${timeRemaining} seconds`;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function endQuiz() {
  clearInterval(timerInterval); // Clear the timer when the quiz ends
  showScore();
}

function showScore() {
  resetState();
  if (score === questions.length) {
    questionElement.innerHTML = `Congratulations! You scored full marks (${score}/${questions.length})!`;
  } else {
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}. Try again for a full score!`;
  }
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

nextButton.addEventListener("click", () => {
  if (nextButton.innerHTML === "Play Again") {
    startQuiz(); // Reset the quiz when "Play Again" is pressed
  } else if (currentQuestionIndex < questions.length) {
    handleNextButton();
  }
});

startQuiz();
