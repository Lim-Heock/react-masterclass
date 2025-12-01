import { useRecoilValue } from "recoil";
import { toDoAtom } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  // atom 값을 읽기' 만 할 때 사용 (성능 최적화)
  const toDos = useRecoilValue(toDoAtom);

  console.log("현재 전체 목록:", toDos);
  return (
    <div>
      <h2>나의 할 일 목록</h2>
      <hr />
      <CreateToDo />
      {/* atom에서 읽어온 toDos 배열을 map으로 순회하며 표시*/}
      {toDos.map((toDo) => (
        // key에 고유한 id를 넣고, 화면에는 text를 보여줍니다.
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;

// 이 컴포넌트는 toDoAtom의 값을 **읽기만 합니다.useRecoilValue를 사용하면
// toDoAtom이 변경될 때마다 이 컴포넌트가 자동으로 리렌더링 되어 최신 목록을 보여 줍니다.
