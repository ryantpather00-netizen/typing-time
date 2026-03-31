const levelOneItems = ["a", "s", "d", "f", "j", "k", "l", ";"];
const levelTwoItems = ["cat", "dog", "sun", "hat", "red", "jam", "fish", "lamp"];
const levelThreeItems = [
  "the cat runs",
  "dogs can jump",
  "the sun is hot",
  "i can type fast",
  "my hands stay calm"
];

let currentLevel = 1;
let practiceItems = [];
let currentIndex = 0;
let score = 0;
let attempts = 0;

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");

  sections.forEach(function (section) {
    section.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");
}

function getLevelItems(level) {
  if (level === 1) {
    return levelOneItems;
  } else if (level === 2) {
    return levelTwoItems;
  } else {
    return levelThreeItems;
  }
}

function startLesson(level) {
  currentLevel = level;
  practiceItems = getLevelItems(level);
  currentIndex = 0;
  score = 0;
  attempts = 0;

  document.getElementById("levelLabel").textContent = "Level " + currentLevel;
  document.getElementById("scoreValue").textContent = score;
  document.getElementById("accuracyValue").textContent = "0";
  document.getElementById("progressValue").textContent = "1";
  document.getElementById("feedbackMessage").textContent = "";

  showSection("practice");
  showItem();
}

function showItem() {
  document.getElementById("displayText").textContent = practiceItems[currentIndex];
  document.getElementById("typingInput").value = "";
  document.getElementById("typingInput").focus();
  document.getElementById("progressValue").textContent = currentIndex + 1;
}

function checkTyping() {
  const inputBox = document.getElementById("typingInput");
  const userText = inputBox.value.trim();
  const correctText = practiceItems[currentIndex];
  const feedback = document.getElementById("feedbackMessage");

  if (userText === "") {
    feedback.textContent = "Please type something before submitting.";
    return;
  }

  attempts = attempts + 1;

  if (userText.toLowerCase() === correctText.toLowerCase()) {
    score = score + 1;
    feedback.textContent = "Correct.";
  } else {
    feedback.textContent = "Not quite. Correct answer: " + correctText;
  }

  updateStats();
  currentIndex = currentIndex + 1;

  if (currentIndex < practiceItems.length) {
    setTimeout(showItem, 700);
  } else {
    setTimeout(showResults, 700);
  }
}

function updateStats() {
  let accuracy = 0;

  if (attempts > 0) {
    accuracy = Math.round((score / attempts) * 100);
  }

  document.getElementById("scoreValue").textContent = score;
  document.getElementById("accuracyValue").textContent = accuracy;
}

function showResults() {
  let accuracy = 0;

  if (attempts > 0) {
    accuracy = Math.round((score / attempts) * 100);
  }

  document.getElementById("finalScore").textContent = score + " / " + practiceItems.length;

  let message = "";

  if (accuracy === 100) {
    message = "Excellent work. Your accuracy was 100%. You completed this level perfectly.";
  } else if (accuracy >= 70) {
    message = "Nice job. Your accuracy was " + accuracy + "%. You are improving well.";
  } else {
    message = "Good effort. Your accuracy was " + accuracy + "%. Try the level again to improve.";
  }

  document.getElementById("finalSummary").textContent = message;
  showSection("results");
}

function restartLevel() {
  startLesson(currentLevel);
}

document.addEventListener("DOMContentLoaded", function () {
  const typingInput = document.getElementById("typingInput");

  typingInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      checkTyping();
    }
  });
});
