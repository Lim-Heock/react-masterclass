<<<<<<< HEAD
=======
import React from "react";
import { useRecoilState } from "recoil";
>>>>>>> 64a5b4d (5.1 Set Selectors)
import { hourSelector, minuteState } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";

function App() {
<<<<<<< HEAD
  const [minutes, setMinutes] = useRecoilState(minuteState); // atom의 값을 더해서 atom을 수정할 함수까지 준다는 것을 기억
  const hours = useRecoilValue(hourSelector);
=======
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
>>>>>>> 64a5b4d (5.1 Set Selectors)
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); // 2.해당 값이 type : string 이기에 문제가 생김 -> + 을 넣어줌
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="MInutes"
      />
      <input
        onChange={onHoursChange}
        value={hours}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}

export default App;
