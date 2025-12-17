import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useRef } from "react";

const Wrapper = styled.div`
  padding-top: 5px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  padding: 10px;
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  color: #234c6a;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#4B9DA9"
      : props.isDraggingFromThis
      ? "transparent"
      : "#91C6BC"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px 20px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    inputRef.current?.focus(); // input 에서 강제로 포커스를 둔다 (커서 깜빡임
    //5초뒤에 포커스를 없애는 (blur)테스트 코드
    setTimeout(() => {
      inputRef.current?.blur();
    }, 5000);
  };

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      {/*Ref 연결 및 테스트 버튼 추가*/}
      <input ref={inputRef} placeholder="input me" />
      <button onClick={onClick}>click me</button>

      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} index={index} toDo={toDo} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;

// reference는 react코드를 이용해 HTML 요소를 지정하고, 가져올 수 있는 방법
// useRef를 이용해서 html 요소를 가져오고 onClick이 그걸 받아서 새로운 모션을 진행한 것
// 결국 어떤 html의 요소와 같이 연동하려면 useRef<HtmlInputElment>(ex)를 사용하면 된다는 생각
