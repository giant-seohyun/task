import { datas } from "./constant.js";

console.log("on");

const textArea = document.getElementById("text-result");
const textDelay = document.getElementById("text-delay");
const textAddData = document.getElementById("text-add-data");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const stop = document.getElementById("stop");
const go = document.getElementById("go");
const back = document.getElementById("back");
const forward = document.getElementById("forward-jump");
const prev = document.getElementById("prev-jump");
const addData = document.getElementById("add-data");
let isStart = true;
let isPause = false;
let isResume = true;
let isBack = false;
let isForward = false;
let isPrev = false;
let passedTime = 0;
let startTime;
let endTime;
let remaindTime;
let pauseTime;
let time;
let delay;
let preDelay;
let totalDelay;
let randomNum;
let idx = 0;

// 딜레이 시간 변경
function sleep(ms) {
  return new Promise((r) => {
    time = setTimeout(r, ms);
  });
}

// 랜덤 값 추출
function randomData() {
  randomNum = Math.floor(Math.random() * (datas.length + 1));
  datas.push(datas[randomNum]);
}

async function plusDelayTimer() {
  clearTimeout(time);

  for (let i = 0; i < datas.length; i++) {
    if (isPause || isForward) i = idx + 1;

    startTime = new Date();
    if (i === datas.length - 1) preDelay = 0;
    else preDelay = datas[i + 1].preDelay;
    delay = datas[i].delay;
    idx = i;

    await sleep(datas[i].preDelay);
    textDelay.value += `\npreDelay ${datas[i].preDelay} delay ${delay}`;
    textArea.value += `\n${datas[i].text}`;
    await sleep(delay);
  }
}

async function minusDelayTimer() {
  clearTimeout(time);

  for (let i = datas.length - 1; i > -1; i--) {
    if (isPause || isPrev) i = idx - 1;

    startTime = new Date();
    if (i === 0) preDelay = 0;
    else preDelay = datas[i - 1].preDelay;
    delay = datas[i].delay;
    idx = i;

    await sleep(datas[i].preDelay);
    textDelay.value += `\npreDelay ${datas[i].preDelay} delay ${delay}`;
    textArea.value += `\n${datas[i].text}`;
    await sleep(delay);
  }
}

// 데이터 점프
function jumpDelayTimer() {
  if (isForward) {
    textDelay.value += `\npreDelay ${0} delay ${0}`;
    textArea.value += `\n${datas[idx + 1].text}`;
    idx++;
  }
  if (isPrev) {
    textDelay.value += `\npreDelay ${0} delay ${0}`;
    textArea.value += `\n${datas[idx - 1].text}`;
    idx--;
  }
}

// 타이머
function timer() {
  if (isStart) plusDelayTimer();
  if (isBack) minusDelayTimer();
}

start.addEventListener("click", () => {
  isPause = false;
  isBack = false;
  pauseTime = true;
  time = 0;

  if (isStart) {
    textArea.value = "start";
    textDelay.value = `delay time`;
  }
  timer();
  idx = 0;
  isStart = false;
});

pause.addEventListener("click", () => {
  isPause = true;
  isResume = true;
  isStart = true;
  if (pauseTime) {
    endTime = new Date();
    if (delay === 0 || preDelay === 0) passedTime = 0;
    else passedTime = endTime - startTime;
    totalDelay = preDelay + delay;
    remaindTime = totalDelay - passedTime;
  }
  if (isPause) {
    textArea.value += `\npause 할당시간 :${passedTime}, 남은시간 :${remaindTime}`;
    textDelay.value += `\n총 딜레이 :${totalDelay}`;
  }
  clearTimeout(time);
  time = null;
  pauseTime = false;
});

resume.addEventListener("click", () => {
  if (isResume) timer();

  isResume = false;
  pauseTime = true;
  isStart = true;
});

stop.addEventListener("click", () => {
  textArea.value = "stop\n";
  textDelay.value = "stop\n";

  clearTimeout(time);
  time = null;
  isResume = false;
  isStart = true;
});

go.addEventListener("click", () => {
  isBack = false;
  isStart = true;
  pauseTime = true;
  textArea.value += "\ngo";
  textDelay.value += `\ngo`;
  if (isResume) timer();

  isResume = false;
});

back.addEventListener("click", () => {
  textArea.value += "\nback";
  textDelay.value += "\nback";
  isBack = true;
  isPause = true;
  pauseTime = true;
  timer();
});

forward.addEventListener("click", () => {
  isForward = true;
  isPrev = false;
  jumpDelayTimer();
});

prev.addEventListener("click", () => {
  isPrev = true;
  isForward = false;
  jumpDelayTimer();
});

addData.addEventListener("click", () => {
  randomData();
  textAddData.innerHTML = `${JSON.stringify(datas[randomNum])}`;
});
