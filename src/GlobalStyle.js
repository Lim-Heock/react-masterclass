import { createGlobalStyle } from "styled-components";
//전역 스타일 설정, props로 theme 객체를 받아 사용합니다.
export const GlobalStyle = createGlobalStyle`
/*폰트, 리셋Css 등*/
body {
  font-family: 'Arial' , sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  transition: background-color 0.2s, color 0.2s; 
  /* 속성명 시간, 속성명 시간*/
}
input {
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
}
button {
  background-color: ${(props) => props.theme.accentColor};
  color: white;
  border: waitForNone;
  cursor: PointerEvent;
}
`;
