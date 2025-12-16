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
  const onDragEnd = (info: DropResult) => { 
    console.log(info);
    const {destination, source, draggableId} = info;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
      const boardCopy = [ ...allBoards[source.droppableId]];
      boardCopy.splice(source.index, 1);
      boardCopy.splice(destination.index, 0, draggableId);
      return {
        ...allBoards, // 변화없는 부분
        [source.droppableId] : boardCopy, // 변화된 부분 
        /*key 자리에 대괄호 [ ]를 쓴 것은 **"변수 안에 담긴 값을 키(Key) 이름으로 쓰겠다"**는 뜻입니다. (Computed Property Name)
      source.droppableId: 그냥 쓰면 문법 에러가 나거나 문자 그대로 인식될 수 있음.
      [source.droppableId]: 변수를 해석해서 그 안에 들어있는 값(예: "To Do", "Doing" 등)을 키 이름으로 동적으로 사용함.*/

        //자바스크립트 객체(Object)에서는 "키(Key)가 중복되면, 뒤에 오는 것이 덮어쓴다(Overwrite)"는 절대 규칙이 있습니다. 이 규칙 때문에 대체(수정)가 가능한 것입니다.
      };
      });
    }
  }

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
