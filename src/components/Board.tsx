import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

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

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    box-sizing: border-box;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
  //innerRef: 라이브러리가 HTML 요소를 조작하기 위한 참조값
  innerRef: React.Ref<HTMLDivElement>;
  //draggableProps: 이 컴포넌트가 '드래그 가능한 객체' 임을 등록하는 모든 정보
  draggableProps: any;
  //dragHandleProps: 이 컴포넌트의 '어느부위를 잡아야" 드래그가 시작될지 결정하는 정보
  dragHandleProps: any;
}

interface IForm {
  toDo: string;
}

function Board({
  toDos,
  boardId,
  innerRef,
  draggableProps,
  dragHandleProps,
}: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", ""); // toDo라는 이름의 input을 초기화
  };
  return (
    <Wrapper ref={innerRef} {...draggableProps}>
      <Title {...dragHandleProps}>{boardId}</Title>

      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder="To Do"
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoText={toDo.text}
                toDoId={toDo.id}
              />
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
