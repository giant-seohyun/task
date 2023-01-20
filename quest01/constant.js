// text는 필수. delay는 option

const datas = [
  { text: "하나", delay: 1000, preDelay: 500 },
  { text: "둘", delay: 500 },
  { text: "셋", delay: 0 },
  { text: "넷", delay: 1000 },
  { text: "다섯", delay: 500 },
  { text: "여섯", delay: 200 },
  { text: "일곱", delay: 3000 },
  { text: "여덟" },
  { text: "아홉", delay: 1000 },
  { text: "열", delay: 0 },
];

export { datas };

// pauseTime = setInterval(() => {
//   if (passedTime === 1000) {
//     passedTime = 0;
//   } else passedTime++;
// }, 1);

// pauseTime = performance.now();
// passedTime = pauseTime - runTime;
// remaindTime = delay - passedTime;

// console.log("시작시간", runTime);
// console.log("정지시간", pauseTime);
// console.log("전체 딜레이 시간", remaindTime);
