import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "tomato" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.1)" : "none"};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    color: tomato;
  }
`;

interface IDragabbleCardProps {
  toDoId: number;
  index: number;
  toDoText: string;
  boardId: string;
}

function DragabbleCard({
  toDoId,
  index,
  toDoText,
  boardId,
}: IDragabbleCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  // 삭제 기능 함수
  const onDelete = () => {
    setToDos((allBoards) => {
      // 1.지우려는 보드의 기존 할일
      const targetBoard = allBoards[boardId];
      // 2.filter 함수 사용: 내 Id(toDoId)랑 다른 애들만 남겨라!
      const newToDos = targetBoard.filter((toDo) => toDo.id !== toDoId);

      // 3. 갈아끼우기
      return {
        ...allBoards,
        [boardId]: newToDos,
      };
    });
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
          {/* [추가] 버튼 만들고 클릭 이벤트 연결 */}
          <Button onClick={onDelete}>🗑️</Button>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
