// 지금까지 작성한 7.0강 코드는 **"분(State)이 바뀌면 -> 시간(Selector)이 자동으로 계산됨"**이라는 단방향 흐름이었습니다. 이제 배울 7.1강 내용은 그 반대입니다. "시간을 수정하면 -> 분도 자동으로 계산되게" 만드는 양방향 흐름을 만드는 것입니다.

// 미리 코드를 적용해 볼 수 있도록 핵심 변경 사항을 알려드릴게요.

// 1. atoms.tsx 수정 (핵심!)
// selector 안에 get만 있었는데, 이제 **set**이라는 함수를 추가합니다. "시간(hours)" 값이 들어오면 그걸 다시 "분(minutes)"으로 바꿔서 원래 state(minuteState)를 업데이트해주는 로직입니다.

import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: ITodo[];
}
// 로컬 스토리지 확인 함수
// 1.저장된 게 있는지 확인하고
// 2.있으면 JSON.parse로 다시 객체로 변환해서 리턴
// 3.없으면 null 리턴
const getSavedToDos = () => {
  const localData = localStorage.getItem("toDos");
  if (localData) {
    return JSON.parse(localData); // JSON 파일(텍스트 문자열로 되어 있는 녀석을)
    // 다시 자바스크립트가 쓸 수 있는 객체 형태(Object)로 되살려낸다 .App 35 Line
  }
  return null;
};

export const toDoState = atom<IToDoState>({
  key: "toDo",
  // [변경점] default 값 설정
  // 저장된 게 있으면(getSavedToDos) 가 값을 주면, 그것을 쓰고
  // 없으면 (null이면) 우리가 쓰던 초기값을 씁니다
  default: getSavedToDos() || { to_do: [], doing: [], done: [] },
});
