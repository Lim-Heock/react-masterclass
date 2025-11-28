//react-hook-form 과 Recoil atom 변경이 동시에 일어나는 핵심 파일입니다.
/* 이 컴포넌트는 toDoAtom의 값을 *변경(write)하기만 합니다.
  useForm으로 폼을 만들고, 유효성 검사(register)를 통과하면(handleSubmit), 
  onValid 함수가 실행됩니다.
  onValid 안에서 setToDos를 호출해 Recoil atom에 새로운 할 일을 추가합니다. 

*/
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoAtom } from "../atom";

function CreateToDo() {
  //1. useForm 훅을 사용해 폼 기능 가져오기
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }, //7. 유효성 검사 에러 객체
  } = useForm();

  //2. atom 값을 '변경'만 하는 함수 가져오기
  //값을 잃을 필요가 없으므로 useSetRecoilState(성능최적화)
  const setToDos = useSetRecoilState(toDoAtom);

  //3.폼 제출 시 실행될 함수
  const onValid = (data) => {
    //data 에는 { toDo: "입력값" }이 들어있음
    console.log("Add to do:", data.toDo);

    //4.Recoil atom 상태 업데이트
    setToDos((oldTodos) => [
      { text: data.toDo, id: Date.now() }, // 새 할 일 객체
      ...oldTodos, // 기존 할 일 목록록
    ]);
    //5.폼 입력창 비우기
    setValue("toDo", "");
  };
  return (
    //6. handleSubmit이 onValid 함수를 감싸서 실행
    <form onSubmit={handleSubmit(onValid)} style={{ margin: "20px 0" }}>
      <input
        /* 7. register로 'toDo'라는 이름 등록 + 유효성 검사 */
        {...register("toDo", {
          required: "할 일을 입력해주세요.", //
          minLength: {
            value: 2, // 최소 두글자
            message: "2글자 이상 입력해주세요.",
          },
          // validate
          validate: {
            noTest: (value) =>
              value.includes("test") ? "test라는 단어는 금지 입니다 😂" : true,
            noheock: (value) =>
              value.includes("heock") ? "내가 할 일은 아닙니다" : true,
          },
        })}
        placeholder="오늘 할 일을 입력하세요"
        style={{ padding: "10px", width: "300px" }}
      />
      <button style={{ padding: "10px", marginTop: "5px" }}></button>
      {/*8. 유효성 검사 에러 메시지표시*/}
      <div style={{ color: "red", marginTop: "5px" }}>
        {errors?.toDo?.message}
      </div>
    </form>
  );
}
export default CreateToDo;
//+29;
