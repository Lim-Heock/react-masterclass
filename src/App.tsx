import { hourSelector, minuteState } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState); // atom의 값을 더해서 atom을 수정할 함수까지 준다는 것을 기억
  const hours = useRecoilValue(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); // 2.해당 값이 type : string 이기에 문제가 생김 -> + 을 넣어줌
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="MInutes"
      />
      <input value={hours} type="number" placeholder="Hours" />
    </div>
  );
}

export default App;
