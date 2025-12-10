// 네, 7.1강 **"Set Selectors"**는 정말 재미있는 부분입니다
// 2. App.tsx 수정
// 이제 hourSelector가 값을 **읽기(get)**도 하고 **쓰기(set)**도 할 수 있게 되었으므로, 사용하는 훅(Hook)을 바꿔야 합니다.
// minute의 값을 수정 및 쓰기를 하는 건 hour에서 조정하기 위함이다

// useRecoilValue → **useRecoilState**로 변경 (읽기/쓰기 모두 가능하게)

// onHoursChange 함수 추가 (시간 입력창에 입력했을 때 실행)
// import { hourSelector, minuteState } from "./atoms";
// import { useRecoilState } from "recoil";

// function App() {
//   const [minutes, setMinutes] = useRecoilState(minuteState); // atom의 값을 더해서 atom을 수정할 함수까지 준다는 것을 기억
//   const [hours, setHours] = useRecoilState(hourSelector); // RecoilState 값을 쓸 때 첫번째 요소는 atom 값이거나 , selector의 get 함수 값이 들어간다
//   // 이때 typeScript는 unknown이 뜨기 때문에 기존의 component에서 type<number>를 추가해준다. atom 확인
//   const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
//     setMinutes(+event.currentTarget.value); // 2.해당 값이 type : string 이기에 문제가 생김 -> + 을 넣어줌
//   };
//   // 추가: 시간이 바뀌면 setHours를 통해 selector 이 'set'함수를 실행한다
//   const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
//     setHours(+event.currentTarget.value);
//   };
//   return (
//     <div>
//       <input
//         value={minutes}
//         onChange={onMinutesChange}
//         type="number"
//         placeholder="Minutes"
//       />
//       <input
//         value={hours}
//         onChange={onHoursChange}
//         type="number"
//         placeholder="Hours"
//       />
//     </div>
//   );
// }

//이 강의의 핵심은 **"드래그를 끝냈을 때(onDragEnd), 아이템이 원래 자리로 돌아가는 것이 아니라 변경된 위치에 고정되도록 배열 순서를 바꾸는 것"**입니다.

// export default App;
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
function App() {
  // 1. 드래그할 아이템들을 배열 State로 관리
  const [toDos, setToDos] = useState(["a", "b", "c", "d", "e"]);
  // 2. 드래그가 끝낫을 때 실행되는 함수
  const onDragEnd = ({ destination, source }: DropResult) => {
    //2-1. 지정된 영역이 아닌 곳에 드랍했을 경우 아무것도 하지 않음
    if (!destination) return;
    //2-2. 배열 복사 및 재배치 로직
    setToDos((oldToDos) => {
      const toDosCopy = [...oldToDos];
      // 1) 움직인 아이템을 자리에서 삭제
      const itemToMove = toDosCopy.splice(source.index, 1)[0];
      // splice는 여러 개를 지울 수도 있기 때문에, 무조건 결과물을 배열(박스)에 담아서 주는 규칙이 있기 때문입니다.
      // 박스 안에 아이템이 딱 하나(0번) 들어있으니, 그걸 꺼내는 것입니다.
      // 2) 아이템을 도착한 자리에서( destination)에 삽입
      toDosCopy.splice(destination.index, 0, itemToMove); // (start, deleteCount, item)
      // 0은 삭제하지 않고 추가만 한다는 뜻
      return toDosCopy; // 변경된 배열 반환
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {() => (
            <ul>
              <Draggable draggableId="first" index={0}>
                {() => <li>one</li>}
              </Draggable>
              <Draggable draggableId="second" index={1}>
                {() => <li>two</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;

// children은 함수여야 한다
