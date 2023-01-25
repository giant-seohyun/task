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

// textArea.value += `\n${datas[i].text}`;
// await sleep(datas[idx].delay);
// if (!isPrev) idx++;
// else idx--;

// if (idx === datas.length) idx = 0;
// else if (idx < 1) idx = datas.length;
