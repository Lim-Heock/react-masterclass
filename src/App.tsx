// 구제적인 드래그 UI 구현은 DraggableCard에 위임, 데이터를 관리하고 리스트를
// 리스트를 나열하는 역할만 한다
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import { info } from "console";

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
  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    if (!destination) return;

    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return {
          ...allBoards, // 변화없는 부분
          [source.droppableId]: boardCopy, // 변화된 부분
        };
      });
    }
    // 다른 보드로 이동(새로 추가된 핵심)
    if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        //출발지 보드와 목적지 보드를 각각 복사
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];

        //출발지에서 아이템지우기
        sourceBoard.splice(source.index, 1);
        // 목적지에 정해진 위치에 넣기
        destinationBoard.splice(destination.index, 0, draggableId);

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
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;

// children은 함수여야 한다
