/* react-hook-form 과 Recoil atom 변경이 동시에 일어나는 핵심 */

import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

function CreateToDo() {
  //useForm 으로 폼 기능 가져오기
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // atom 값을 '변경'만 하는 함수 가져오기
  // 값을 읽을 필요 x. useSetRecoilState( 성능최적화 )
  const setToDos = useSetRecoilState(toDoAtom);
  // 폼 제출 시 실행될 함수
  const onValid = (data) => {
    console.log("Add to do: ", data.toDo);

    //Recoil atom 상태 업데이트
    setToDos((oldToDos) => [
      { text: data.toDo, id: Date.now() }, //  새 할 일 객체
      ...oldToDos, // 기존 목록
    ]);
    // 폼 입력창 비우기
    setValue("toDo", "");
  };

  return (
    // handleSubmit이 onValid 함수를 감싸서 실행
    <form onSubmit={handleSubmit(onValid)} style={{ margin: "20px 0" }}>
      <input
        //register로 'toDo'라는 이름 등록 + 유효성 검사
        {...register("toDo", {
          required: "할 일을 입력해주세요.", // 필수 항목
          minLength: {
            value: 2, // 최소 2글자
            message: "2글자 이상 입력해주세요",
          },
        })}
        placeholder="오늘 할 일을 입력하세요"
        style={{ padding: "10px", width: "300px" }}
      />
      <button style={{ padding: "10px" }}>추가</button>
      {/*유효성 검사 에러 메시지 표시*/}
      <div style={{ color: "red", marginTop: "5px" }}>
        {errors?.toDo?.message}
      </div>
    </form>
  );
}
