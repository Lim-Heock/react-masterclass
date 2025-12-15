// 구제적인 드래그 UI 구현은 DraggableCard에 위임, 데이터를 관리하고 리스트를
// 리스트를 나열하는 역할만 한다
import { DragDropContext, DropResult } from "react-beautiful-dnd";
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

  const onDragEnd = ({ destination, source, draggableId }: DropResult) => {
    if (!destination) return;
    // setToDos((oldToDos) => {
    //   if (!destination) return oldToDos;
    //   const toDosCopy = [...oldToDos];
    //   //1) delete item on source.index
    //   toDosCopy.splice(source.index, 1);
    //   //2) add item on destination.index
    //   toDosCopy.splice(destination?.index, 0, draggableId);
    //   //3) return new array
    //   return toDosCopy;
    // });
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
