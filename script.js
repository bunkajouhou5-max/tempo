let phase = "compress";
let count = 0;
let score = 0;
let lastTime = null;

const instruction = document.getElementById("instruction");
const counter = document.getElementById("counter");
const chest = document.getElementById("chest");
const mouth = document.getElementById("mouth");

function judgeTempo(interval) {
  if (interval >= 500 && interval <= 600) return "Perfect";
  if (
    (interval >= 400 && interval < 500) ||
    (interval > 600 && interval <= 700)
  ) return "Good";
  return "Miss";
}

chest.addEventListener("click", () => {
  if (phase !== "compress") return;

  const now = Date.now();

  if (lastTime !== null) {
    const interval = now - lastTime;
    const result = judgeTempo(interval);

    if (result === "Perfect") score += 2;
    if (result === "Good") score += 1;

    instruction.textContent =
      `胸骨圧迫中（${result}｜間隔 ${interval}ms）`;
  }

  lastTime = now;
  count++;
  counter.textContent = `${count} / 30`;

  if (count === 30) {
    phase = "breath";
    count = 0;
    lastTime = null;
    instruction.textContent = "人工呼吸を行ってください";
    counter.textContent = "0 / 2";
  }
});

mouth.addEventListener("click", () => {
  if (phase !== "breath") return;

  count++;
  counter.textContent = `${count} / 2`;

  if (count === 2) {
    alert(`1セット完了！\nスコア：${score} 点`);
    phase = "compress";
    count = 0;
    score = 0;
    instruction.textContent = "胸骨圧迫を行ってください";
    counter.textContent = "0 / 30";
  }
});
