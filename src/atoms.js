import { atom } from 'recoil';

/**
 * 6.0 & 6.1: 다크 모드 상태 (boolean)
 * - key: atom의 고유 ID. 다른 atom과 겹치면 안 됩니다.
 * - default: atom의 기본값. 여기서는 false (라이트 모드)로 시작.
 */
export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});

/**
 * 6.5: 할 일 목록 상태 (array)
 * - key: 'toDo'라는 고유 ID
 * - default: 기본값은 빈 배열 []
 */
export const toDoAtom = atom({
  key: 'toDo',
  default: [],
});
