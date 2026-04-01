const levelOneItems = ["a", "s", "d", "f", "j", "k", "l", ";"];
const levelTwoItems = ["cat", "dog", "sun", "hat"];
const levelThreeItems = ["the cat runs", "dogs can jump"];

let currentLevel = 1;
let practiceItems = [];
let currentIndex = 0;
let score = 0;

function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(function (section) {
    section.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}

function getLevelItems(level) {
  if (level === 1) return levelOneItems;
  if (level === 2) return levelTwoItems;
  return levelThreeItems;
}

function startLesson(level) {
  currentLevel = level;
  practiceItems = getLevelItems(level);
  currentIndex = 0;
  score = 0;

  document.getElementById("levelLabel").textContent = "Level " + currentLevel;
  document.getElementById("scoreValue").textContent = score;
  document.getElementById("progressValue").textContent = "1";
  document.getElementById("feedbackMessage").textContent = "";

  showSection("practice");
  showItem();
}

function showItem() {
  document.getElementById("displayText").textContent = practiceItems[currentIndex];
  document.getElementById("typingInput").value = "";
  document.getElementById("progressValue").textContent = currentIndex + 1;
}

function checkTyping() {
  const userText = document.getElementById("typingInput").value.trim();
  const correctText = practiceItems[currentIndex];
  const feedback = document.getElementById("feedbackMessage");

  if (userText === "") {
    feedback.textContent = "Please type something.";
    return;
  }

  if (userText.toLowerCase() === correctText.toLowerCase()) {
    score = score + 1;
    feedback.textContent = "Correct.";
  } else {
    feedback.textContent = "Try again.";
  }

  document.getElementById("scoreValue").textContent = score;
  currentIndex = currentIndex + 1;

  if (currentIndex < practiceItems.length) {
    showItem();
  } else {
    feedback.textContent = "Lesson complete.";
  }
}
