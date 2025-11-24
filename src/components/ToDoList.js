import { useRecoilValue } from 'recoil';
import { toDoAtom } from '../atoms';

function ToDoList() {
  //1. atom 값을 읽을때만 사용
  const toDos = useRecoilValue(toDoAtom);

  return (
    <div>
      <h2>나의 할 일 목록</h2>
      <ul>
        {/* atom에서 읽어온 toDos 배열로 map을 순회하여 표시 */}
        {toDos.map(toDo => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
