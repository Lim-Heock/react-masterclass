import { atom } from "recoil";

/** 
 key: atom의 고유ID, 다른 atom 과 겹치면 안된다.
 default: atom의 기본값, 여기서는 false (라이트 모드)로 start
*/
export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

/**
 할일 목록 상태 (array)
 -key: 'toDo'라는 고유 ID
 -default: 기본값은 빈 배열[]
 */
export const toDoAtom = atom({
  key: "todo",
  default: [],
});
/**
 * atom은 앱의 '상태조각',
 * isDarkAtom은 "지금 다크 모드인가" 라는 질문의 상태
 * toDoAtom은 "지금 할 일이 뭐가 있지?"
 * 컴포넌트들 -> atom 을 구독(subscribe) 해서 값을 읽거나 변경
 */
