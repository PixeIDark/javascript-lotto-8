import {
  validateWinningBlank,
  validateWinningDuplicate,
  validateWinningFormat,
  validateWinningNumber,
  validateWinningNumeric,
  validateWinningRange,
} from "../../../src/utils/validator/winningNumber.js";
import {ERROR_MESSAGE} from "../../../src/constants/message.js";

describe("당첨 번호 검증 테스트", () => {
  describe("validateWinningBlank", () => {
    test.each([[""], ["   "]])("공백인 문자열 %p는 예외가 발생한다", (input) => {
      expect(() => validateWinningBlank(input)).toThrow(ERROR_MESSAGE.WINNING_BLANK);
    });

    test.each([
      [" 1,2,3,4,5,6 ", "1,2,3,4,5,6"],
      ["  1, 2, 3, 4, 5, 6  ", "1, 2, 3, 4, 5, 6"],
    ])("문자가 존재하면 앞뒤 공백을 제거: %p → %p", (input, expected) => {
      expect(validateWinningBlank(input)).toBe(expected);
    });
  });

  describe("validateWinningFormat", () => {
    test.each([["1,2,3,4,5"], ["1,2,3,4,5,6,7"]])("6개가 아닌 %p는 예외가 발생한다", (input) => {
      expect(() => validateWinningFormat(input)).toThrow(ERROR_MESSAGE.WINNING_LENGTH);
    });

    test.each([
      ["1,2,3,4,5,6", ["1", "2", "3", "4", "5", "6"]],
      ["10, 20, 30, 40, 45, 1", ["10", " 20", " 30", " 40", " 45", " 1"]],
    ])("쉼표로 구분된 %p는 배열로 반환: %p", (input, expected) => {
      expect(validateWinningFormat(input)).toEqual(expected);
    });
  });

  describe("validateWinningNumeric", () => {
    test.each([
      [["1", "2", "3", "4", "5", "abc"]],
      [["1", "2a", "3", "4", "5", "6"]],
    ])("숫자가 아닌 문자 포함 %p는 예외가 발생한다", (input) => {
      expect(() => validateWinningNumeric(input)).toThrow(ERROR_MESSAGE.WINNING_NUMBER_FORMAT);
    });

    test.each([
      [["1", "2", "3", "4", "5", "6"], [1, 2, 3, 4, 5, 6]],
      [["10", "20", " 30", " 40 ", "45", "1"], [10, 20, 30, 40, 45, 1]],
    ])("모두 숫자인 %p는 숫자 배열로 변환: %p", (input, expected) => {
      expect(validateWinningNumeric(input)).toEqual(expected);
    });
  });

  describe("validateWinningRange", () => {
    test.each([
      [[1, 2, 3, 4, 5, 0]],
      [[1, 2, 3, 4, 5, 46]],
      [[-1, 2, 3, 4, 5, 6]],
    ])("1~45 범위를 벗어난 %p는 예외가 발생한다", (input) => {
      expect(() => validateWinningRange(input)).toThrow(ERROR_MESSAGE.WINNING_RANGE);
    });

    test.each([
      [[1, 2, 3, 4, 5, 6]],
      [[10, 20, 30, 40, 45, 1]],
    ])("모두 1~45 범위인 %p는 그대로 반환한다", (input) => {
      expect(validateWinningRange(input)).toEqual(input);
    });
  });

  describe("validateWinningDuplicate", () => {
    test.each([
      [[1, 2, 3, 4, 5, 5]],
      [[1, 1, 1, 1, 1, 1]],
    ])("중복된 번호 %p는 예외가 발생한다", (input) => {
      expect(() => validateWinningDuplicate(input)).toThrow(ERROR_MESSAGE.WINNING_DUPLICATE);
    });

    test.each([
      [[1, 2, 3, 4, 5, 6]],
      [[10, 20, 30, 40, 45, 1]],
    ])("중복이 없는 %p는 그대로 반환한다", (input) => {
      expect(validateWinningDuplicate(input)).toEqual(input);
    });
  });

  describe("validateWinningNumber 통합 테스트", () => {
    test.each([
      ["1,2,3,4,5,6", [1, 2, 3, 4, 5, 6]],
      [" 10, 20, 30, 40, 45, 1 ", [10, 20, 30, 40, 45, 1]],
    ])("유효한 당첨 번호 %p는 숫자 배열로 변환: %p", (input, expected) => {
      expect(validateWinningNumber(input)).toEqual(expected);
    });

    test.each([
      ["   ", ERROR_MESSAGE.WINNING_BLANK],
      ["1,2,3,4,5", ERROR_MESSAGE.WINNING_LENGTH],
      ["1,2,3,4,5,abc", ERROR_MESSAGE.WINNING_NUMBER_FORMAT],
      ["1,2,3,4,5,46", ERROR_MESSAGE.WINNING_RANGE],
      ["1,2,3,4,5,5", ERROR_MESSAGE.WINNING_DUPLICATE],
    ])("유효하지 않은 입력 %p는 %p 예외가 발생한다", (input, errorMessage) => {
      expect(() => validateWinningNumber(input)).toThrow(errorMessage);
    });
  });
});