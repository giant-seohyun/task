import { datas } from "./constant.js";

console.log("on");

const textArea = document.getElementById("text-result");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const stop = document.getElementById("stop");
const go = document.getElementById("go");
const back = document.getElementById("back");
let isStart = true;
let isPause = false;
let isResume = true;
let isBack = false;
let passedTime = 0;
let startTime;
let endTime;
let remaindTime;
let pauseTime;
let time;
let delay;
let idx = 0;

// 딜레이 시간 변경
function sleep(ms) {
  return new Promise((r) => {
    time = setTimeout(r, ms);
  });
}

async function randomDelayTimer() {
  clearTimeout(time);

  for (let i = 0; i < datas.length; i++) {
    if (isPause) i = idx + 1;
    if (isBack) i = idx - 1;

    startTime = new Date();
    delay = datas[i].delay;
    idx = i;

    textArea.value += `\n${datas[i].text}`;
    await sleep(delay);
  }
}

async function minusDelayTimer() {
  clearTimeout(time);

  for (let i = datas.length - 1; i > -1; i--) {
    if (isPause) i = idx - 1;

    startTime = new Date();
    delay = datas[i].delay;
    idx = i;

    textArea.value += `\n${datas[i].text}`;
    await sleep(delay);
  }
}

// 타이머
function timer() {
  randomDelayTimer();
  if (isBack) minusDelayTimer();
}

start.addEventListener("click", () => {
  isPause = false;
  pauseTime = true;
  time = 0;

  if (isStart) textArea.value = "start";
  timer();
  idx = 0;
});

pause.addEventListener("click", () => {
  isPause = true;
  isResume = true;
  if (pauseTime) {
    endTime = new Date();
    passedTime = endTime - startTime;
    remaindTime = delay - passedTime;
  }
  if (isPause)
    textArea.value += `\npause 할당시간 :${passedTime}, 남은시간 :${remaindTime}`;

  clearTimeout(time);
  time = null;
  pauseTime = false;
});

resume.addEventListener("click", () => {
  if (isResume) timer();

  isResume = false;
  pauseTime = true;
});

stop.addEventListener("click", () => {
  textArea.value = "stop\n";

  clearTimeout(time);
  time = null;
  isResume = false;
});

go.addEventListener("click", () => {
  textArea.value += "\ngo";
  if (isResume) timer();

  isResume = false;
  isBack = false;
});

back.addEventListener("click", () => {
  textArea.value += "\nback";
  isBack = true;
  timer();
});
