import {DraggableId} fromd 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

// 설명 Props 타입 정의
interface IDraggableCardProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  //[테스트] 최적화 전에는 드래그할 대마나다 모든 아이템이 로그가 찍힘
  // 추후에는 움직이는 아이템의 로그만 찍힘
  console.log(toDo, "has been rendered");
} 

return (
  <Dragggble draggableId= {toDo} index={index}>
    {(magic) => {
      <Card 
      ref ={magic.innerRef}
      {...magic.draggableProps}
      {...magic.dragHandleProps}
      >
        {toDo}
      </Card>
    }}
  </Dragggble>
)

// [핵심] React.memo로 감싸서 보냄
// prop 이 변하지 않으면 컴포넌트를 다시 그리지 않음
export default React.memo(DraggableCard);
