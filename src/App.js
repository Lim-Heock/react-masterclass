import React from "react";
import { useRecoilState } from "recoil";
import styled, { ThemeProvider } from "styled-components";
//내가 만든 파일들 불러오기
import { isDarkAtom } from "./atom";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyle } from "./GlobalStyle";
//컴포넌트 불러오기
import CreateToDo from "./components/CreateToDo";
import ToDoList from "./ToDoList";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const ThemeToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.accentColor};
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

function App() {
  // isDarkAtom의 값isDark와 변경함수setIsDark를 모두 가져옴
  // React의 useState와 사용법이 같음
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  // 다크 모드 토글함수
  const toggleDarkAtom = () => {
    setIsDark((prev) => !prev); // 현재 값의 반대(true/false)로 변경
  };

  return (
    //isDark값에 따라 lightTheme 또는 darkTheme을 앱 전체에 주입
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle /> {/* 전역스타일 적용*/}
      <Container>
        {/* 토글 버튼*/}
        <ThemeToggleButton onClick={toggleDarkAtom}>
          {isDark ? "☀️" : "🌙"}
        </ThemeToggleButton>
        <CreateToDo />
        <ToDoList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
