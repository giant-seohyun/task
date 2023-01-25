import { datas } from "./constant.js";

console.log("on");

const textArea = document.getElementById("text-result");
const textDelay = document.getElementById("text-delay");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const stop = document.getElementById("stop");
const go = document.getElementById("go");
const prev = document.getElementById("prev");
let isStart = true;
let isPause = false;
let isResume = true;
let isPrev = false;
let passedTime = 0;
let startTime;
let endTime;
let remaindTime;
let pauseTime;
let time;
let delay;

// 딜레이 시간 변경
function sleep(ms) {
  return new Promise((r) => {
    time = setTimeout(r, ms);
  });
}

async function randomDelayTimer() {
  clearTimeout(time);

  for (let i = 0; i < datas.length; i++) {
    // if (isPause) i = time;

    textArea.value += `\n${datas[i].text}`;
    textDelay.value += `\n${datas[i].delay}`;
    await sleep(datas[i].delay);
  }
}

// 타이머
function timer() {
  randomDelayTimer();
}

start.addEventListener("click", () => {
  isPause = false;
  if (isStart) textArea.value = "start";
  timer();
  startTime = new Date();
});

pause.addEventListener("click", () => {
  isPause = true;
  isResume = true;
  endTime = new Date();
  passedTime = endTime - startTime;

  console.log("총 시간 : ", passedTime);

  remaindTime = delay - passedTime;

  if (isPause)
    textArea.value += `\npause 할당시간 :${passedTime}, 남은시간 :${remaindTime}`;

  clearTimeout(time);
  console.log(time);
});

resume.addEventListener("click", () => {
  if (isResume) timer();

  isResume = false;
});

stop.addEventListener("click", () => {
  textArea.value = "stop\n";

  clearTimeout(time);
  time = null;
});

go.addEventListener("click", () => {
  textArea.value += "\ngo";
  if (isResume) timer();
});

prev.addEventListener("click", () => {
  textArea.value += "\nprev";
  isPrev = true;
  timer();
});
