const BPM = 110; // 100〜120の中間
const INTERVAL = 60000 / BPM;
const NOTE_SPEED = 0.35;

const lane = document.getElementById("lane");
const chest = document.getElementById("chest");
const result = document.getElementById("result");
const counter = document.getElementById("counter");
const scoreText = document.getElementById("score");

let notes = [];
let count = 0;
let score = 0;
let gameActive = true;

function createNote() {
  if (!gameActive) return;

  const note = document.createElement("div");
  note.className = "note-dot";
  note.style.left = "320px";
  lane.appendChild(note);
  notes.push(note);

  const startTime = Date.now();

  const timer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const x = 320 - elapsed * NOTE_SPEED;
    note.style.left = x + "px";

    if (x < -30) {
      note.remove();
      notes.shift();
      clearInterval(timer);
    }
  }, 16);
}

const noteInterval = setInterval(createNote, INTERVAL);

chest.addEventListener("click", () => {
  if (!gameActive || notes.length === 0) return;

  const note = notes[0];
  const noteX = note.getBoundingClientRect().left;
  const judgeX = document.getElementById("judge-line").getBoundingClientRect().left;
  const diff = Math.abs(noteX - judgeX);

  let judgment = "Miss";

  if (diff < 10) {
    judgment = "Perfect";
    score += 2;
  } else if (diff < 25) {
    judgment = "Good";
    score += 1;
  }

  result.textContent = judgment;
  scoreText.textContent = `Score: ${score}`;

  note.remove();
  notes.shift();

  count++;
  counter.textContent = `${count} / 30`;

  if (count === 30) {
    gameActive = false;
    clearInterval(noteInterval);

    setTimeout(() => {
      alert(`胸骨圧迫30回 完了！\n最終スコア：${score}`);
    }, 300);
  }
});
