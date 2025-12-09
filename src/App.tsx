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

// export default App;
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};

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
