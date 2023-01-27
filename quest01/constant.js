import {
  start,
  pause,
  resume,
  stop,
  go,
  back,
  forward,
  prev,
  randomAddData,
} from "./index.js";

const textArea = document.getElementById("text-result");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resumeBtn = document.getElementById("resume");
const stopBtn = document.getElementById("stop");
const goBtn = document.getElementById("go");
const backBtn = document.getElementById("back");
const forwardBtn = document.getElementById("forward-jump");
const prevBtn = document.getElementById("prev-jump");
const addDataBtn = document.getElementById("add-data");

startBtn.addEventListener("click", () => {
  start();
});

pauseBtn.addEventListener("click", () => {
  pause();
});

resumeBtn.addEventListener("click", () => {
  resume();
});

stopBtn.addEventListener("click", () => {
  stop();
});

goBtn.addEventListener("click", () => {
  go();
});

backBtn.addEventListener("click", () => {
  back();
});

forwardBtn.addEventListener("click", () => {
  forward();
});

prevBtn.addEventListener("click", () => {
  prev();
});

addDataBtn.addEventListener("click", () => {
  randomAddData();
});

export const datas = [
  {
    callback: () => {
      textArea.value += "\n하나";
    },
    preDelay: 500,
    delay: 1000,
  },
  {
    callback: () => {
      textArea.value += "\n둘";
    },
    preDelay: 300,
    delay: 500,
  },
  {
    callback: () => {
      textArea.value += "\n셋";
    },
    preDelay: 1000,
    delay: 0,
  },
  {
    callback: () => {
      textArea.value += "\n넷";
    },
    preDelay: 200,
    delay: 1000,
  },
  {
    callback: () => {
      textArea.value += "\n다섯";
    },
    preDelay: 0,
    delay: 500,
  },
  {
    callback: () => {
      textArea.value += "\n여섯";
    },
    preDelay: 500,
    delay: 500,
  },
  {
    callback: () => {
      textArea.value += "\n일곱";
    },
    preDelay: 1000,
    delay: 100,
  },
  {
    callback: () => {
      textArea.value += "\n여덟";
    },
  },
  {
    callback: () => {
      textArea.value += "\n아홉";
    },
    preDelay: 500,
    delay: 1000,
  },
  {
    callback: () => {
      textArea.value += "\n열";
    },
    preDelay: 1000,
    delay: 0,
  },
];
