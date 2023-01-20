import { datas } from "./constant.js";

console.log("on");

const textArea = document.getElementById("text-result");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const stop = document.getElementById("stop");
const delayTime = document.getElementById("delay-time");
const go = document.getElementById("go");
const prev = document.getElementById("prev");
let isStart = true;
let isPause = true;
let isResume = true;
let isPrev = false;
let passedTime = 0;
let delayIdx = 0;
let textIdx = 0;
let text;
let remaindTime;
let pauseTime;
let time;
let delay;

// 딜레이 값 병합
const delays = [];
const texts = [];

function getDelays() {
  for (let i = 0; i < 10; i++) {
    delays.push(datas[i].delay);
    if (!datas[i].delay) delays.splice(i, 1, 0);
  }
  return delays;
}

// 텍스트 값 병합
function getTexts() {
  for (let i = 0; i < 10; i++) {
    texts.push(datas[i].text);
    if (!datas[i].text) texts.splice(i, 1, 0);
  }
  return texts;
}

// 딜레이 시간 변경
function changeDelays() {
  getDelays();

  delay = delays[delayIdx];
  if (!isPrev) delayIdx++;
  else if (isPrev) delayIdx--;

  if (delayIdx === delays.length) delayIdx = 0;
  else if (delayIdx < 1) delayIdx = delays.length;
  return delay;
}

// 텍스트 값 변경
function changeTexts() {
  getTexts();

  text = texts[textIdx];
  if (!isPrev) textIdx++;
  else if (isPrev) textIdx--;

  if (textIdx === texts.length) textIdx = 0;
  else if (textIdx < 1) textIdx = texts.length;
  return text;
}

// 딜레이 값 표시
function randomDelayTimer() {
  clearInterval(time);
  textArea.value += `\n${changeTexts()}`;
  delayTime.textContent = delay;
  changeDelays();
  time = setInterval(randomDelayTimer, delay);
}

// 타이머
function timer() {
  randomDelayTimer();

  if (!pauseTime) {
    pauseTime = setInterval(() => {
      passedTime++;
    }, 1);
  }
}

start.addEventListener("click", () => {
  if (isStart) textArea.value = "start";
  if (remaindTime) {
    textArea.value = "start";
    textIdx = 0;
    delayIdx = 0;
  }
  isStart = false;
  isPause = true;
  isResume = false;
  timer();
});

pause.addEventListener("click", () => {
  remaindTime = delay - passedTime;
  if (isPause)
    textArea.value += `\npause 할당시간 :${passedTime}, 남은시간 :${remaindTime}`;

  clearInterval(time);
  time = null;
  clearInterval(pauseTime);
  pauseTime = 0;
  isResume = true;
});

resume.addEventListener("click", () => {
  if (isResume) timer();
  isResume = false;
});

stop.addEventListener("click", () => {
  textArea.value = "stop\n";
  clearInterval(time);
  time = null;
  isStart = true;
  isPause = false;
});

go.addEventListener("click", () => {
  textArea.value += "\ngo";
  if (isResume) timer();
  isResume = false;
  isPrev = false;
});

prev.addEventListener("click", () => {
  textArea.value += "\nprev";
  isPrev = true;
  timer();
});
