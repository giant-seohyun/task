import { datas } from "./constant.js";

console.log("on");

let isStart = true;
let isPause = false;
let isResume = true;
let isBack = false;
let isForward = false;
let isPrev = false;
let idx = 0;
export let passedTime = 0; // 할당시간
let startTime;
let endTime;
export let remaindTime; // 남은시간
let pauseTime;
let time;
let delay;
let preDelay;
let totalDelay;
let randomNum;
export let randomData; // 신규 데이터

// 딜레이 시간 변경
function sleep(ms) {
  return new Promise((r) => {
    time = setTimeout(r, ms);
  });
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
    const { callback } = datas[i];
    if (callback) callback();
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
    const { callback } = datas[i];
    if (callback) callback();
    await sleep(delay);
  }
}

// 데이터 점프
function jumpDelayTimer() {
  if (isForward) idx++;
  if (isPrev) idx--;
}

// 타이머
function timer() {
  if (isStart) plusDelayTimer();
  if (isBack) minusDelayTimer();
}

// **---사용할 수 있는 함수--** //
// 시작
export function start() {
  isPause = false;
  isBack = false;
  pauseTime = true;
  time = 0;

  timer();
  idx = 0;
  isStart = false;
}

// 중지
export function pause() {
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
  clearTimeout(time);
  time = null;
  pauseTime = false;
}

// 이어서 시작
export function resume() {
  if (isResume) timer();

  isResume = false;
  pauseTime = true;
  isStart = true;
}

// 리셋
export function stop() {
  clearTimeout(time);
  time = null;
  isResume = false;
  isStart = true;
}

// 순방향
export function go() {
  isBack = false;
  isStart = true;
  pauseTime = true;
  if (isResume) timer();

  isResume = false;
}

// 역방향
export function back() {
  isBack = true;
  isPause = true;
  pauseTime = true;
  timer();
}

// 한 칸 앞으로
export function forward() {
  isForward = true;
  isPrev = false;
  jumpDelayTimer();
}

// 한 칸 뒤로
export function prev() {
  isPrev = true;
  isForward = false;
  jumpDelayTimer();
}

// 랜덤 데이터 추출
export function randomAddData() {
  randomNum = Math.floor(Math.random() * (datas.length + 1));
  randomData = datas[randomNum];
  datas.push(randomData);
}
// **-----** //
