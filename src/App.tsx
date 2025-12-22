// 구제적인 드래그 UI 구현은 DraggableCard에 위임, 데이터를 관리하고 리스트를
// 리스트를 나열하는 역할만 한다
import { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // [변경점] toDos가 변할 때마다 로컬 스토리지에 저장하는 코드 추가
  useEffect(() => {
    //localStorage는 문자열만 저장할 수 있어서 JSON.stringify로 객체를 문자열로 반환합니다
    localStorage.setItem("toDos", JSON.stringify(toDos)); // "toDos"라는 이름표를 붙여서 넣어라!
  }, [toDos]); // [todos] : toDos가 바뀔 때마다 이 코드를 실행하라

  // 기존 드래그 앤 드롭 로직 그대로 유지
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;
    // source.droppableId가 "boards"라면? -> "아, 유저가 보드 자체를 옮겼구나!"
    if (source.droppableId === "boards") {
      //객체의 키 들만 뽑아서 배열로 만들기
      setToDos((allBoards) => {
        const boardKeys = Object.keys(allBoards);
        //원래 있던 자리(source.index)에서 보드 이름 하나 빼기
        const boardName = boardKeys.splice(source.index, 1)[0];
        //이동할 자리(destination.index)에 보드 이름 끼워넣기
        boardKeys.splice(destination.index, 0, boardName);
        //순서가 바뀐 키 배열을 기준으로 새로운 객체를 다시 조립
        const newBoards: any = {};
        boardKeys.forEach((key) => {
          newBoards[key] = allBoards[key]; //새 껍데기(newBoards)에, 방금 꺼낸 이름(key)을 적고, 내용은 옛날 객체(allBoards)에서 그대로 복사해 넣는다.
        });
        return newBoards;
      });
      return; //onDragEnd 함수 종료
    }
    // dnjs
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards, // 변화없는 부분
          [source.droppableId]: boardCopy, // 변화된 부분
        };
      });
    }
    // 다른 보드로 이동(새로 추가된 핵심)`
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        //출발지 보드와 목적지 보드를 각각 복사
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        const taskObj = sourceBoard[source.index];

        //출발지에서 아이템지우기
        sourceBoard.splice(source.index, 1);
        // 목적지에 정해진 위치에 넣기
        destinationBoard.splice(destination.index, 0, taskObj);

        // 변경된 두 보드를 state에 동시에 업데이트 합니다
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  // 모든 card들을 reRenderting 하기 때문에 옮기고 있을때 잠깐씩 오류가 발생함

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(magic) => (
            <Boards ref={magic.innerRef} {...magic.droppableProps}>
              {Object.keys(toDos).map((boardId, index) => (
                //각 Board를 Draggable로 감싸기
                // Board도 드래그 가능한 상태
                <Draggable key={boardId} draggableId={boardId} index={index}>
                  {(magic, snapshot) => (
                    // 아까 Board.tsx에서 받을 준비를 해둔 Props를 역시ㅓ 넘겨주기
                    <Board
                      boardId={boardId}
                      key={boardId}
                      toDos={toDos[boardId]}
                      innerRef={magic.innerRef}
                      draggableProps={magic.draggableProps}
                      dragHandleProps={magic.dragHandleProps}
                    />
                  )}
                </Draggable>
              ))}
              {magic.placeholder}
            </Boards>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

// children은 함수여야 한다
