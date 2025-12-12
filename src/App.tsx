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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;
const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

const toDos = ["a", "b", "c", "d", "e", "f"];

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <Draggable draggableId={toDo} index={index}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.dragHandleProps}
                        {...magic.draggableProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

// children은 함수여야 한다
