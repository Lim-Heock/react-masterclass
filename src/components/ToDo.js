import React from "react";
import { useSetRecoilState } from "recoil";
import { toDoAtom, Categories } from "../atom";

//props로 text를 받아와서 보여줍니다
export default function ToDo({ text, category, id }) {
  const setToDos = useSetRecoilState(toDoAtom);

  const onClick = (newCategory) => {
    setToDos((oldToDos) => {
      //A. 내가 클릭한 아이템이 배열의 몇 번째에 있는지 찾기(findIndex)
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);

      //B. 기존 정보를 복사하고, 카테고리만 싹 바꾼 '새로운 아이템' 만들기
      const newToDo = { text, id, category: newCategory };

      //C. 배열을 잘라서 새 아이템을 끼워 넣기(불변성 유지!)
      // [앞부분] + [새 아이템] + [뒷부분]
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {/*1.현재 상태가 "Doing" 이 아닐 때만 [Doing] 버튼 보여주기*/}
      {category !== Categories.DOING && (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category !== Categories.TO_DO && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>
      )}
      {category !== Categories.DONE && (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  );
}
