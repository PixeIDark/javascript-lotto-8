import {
  validateBonusBlank,
  validateBonusInteger,
  validateBonusNumber,
  validateBonusNumeric,
  validateBonusRange,
} from "../../../src/utils/validator/bonusNumber.js";
import {ERROR_MESSAGE} from "../../../src/constants/message.js";

describe("보너스 번호 검증 테스트", () => {
  describe("validateBonusBlank", () => {
    test.each([[""], ["   "]])("공백인 문자열 %p는 예외가 발생한다", (input) => {
      expect(() => validateBonusBlank(input)).toThrow(ERROR_MESSAGE.BONUS_BLANK);
    });

    test.each([[" 7 ", "7"], ["  45  ", "45"]])(
      "문자가 존재하면 앞뒤 공백을 제거: %p → %p",
      (input, expected) => {
        expect(validateBonusBlank(input)).toBe(expected);
      },
    );
  });

  describe("validateBonusNumeric", () => {
    test.each([["abc"], ["7a"], ["7!"]])("숫자가 아닌 문자열 %p는 예외가 발생한다", (input) => {
      expect(() => validateBonusNumeric(input)).toThrow(ERROR_MESSAGE.BONUS_NUMBER_FORMAT);
    });

    test.each([["7", 7], ["45", 45], ["1", 1]])("숫자 문자열 %p를 숫자로 변환: %p", (input, expected) => {
      expect(validateBonusNumeric(input)).toBe(expected);
    });
  });

  describe("validateBonusInteger", () => {
    test.each([[7.5], [0.1], [45.99]])("소수 %p는 예외가 발생한다", (input) => {
      expect(() => validateBonusInteger(input)).toThrow(ERROR_MESSAGE.BONUS_INTEGER);
    });

    test.each([[7], [45], [1]])("정수 %p는 그대로 반환한다", (input) => {
      expect(validateBonusInteger(input)).toBe(input);
    });
  });

  describe("validateBonusRange", () => {
    test.each([[0], [-1], [46]])("1~45 범위를 벗어난 %p는 예외가 발생한다", (input) => {
      expect(() => validateBonusRange(input)).toThrow(ERROR_MESSAGE.BONUS_RANGE);
    });

    test.each([[1], [7], [45]])("1~45 범위 내인 %p는 그대로 반환한다", (input) => {
      expect(validateBonusRange(input)).toBe(input);
    });
  });

  describe("validateBonusNumber 통합 테스트", () => {
    test.each([["7", 7], [" 45 ", 45], ["  1  ", 1]])(
      "유효한 보너스 번호 %p를 숫자로 변환: %p",
      (input, expected) => {
        expect(validateBonusNumber(input)).toBe(expected);
      },
    );

    test.each([
      ["   ", ERROR_MESSAGE.BONUS_BLANK],
      ["abc", ERROR_MESSAGE.BONUS_NUMBER_FORMAT],
      ["7.5", ERROR_MESSAGE.BONUS_INTEGER],
      ["0", ERROR_MESSAGE.BONUS_RANGE],
      ["46", ERROR_MESSAGE.BONUS_RANGE],
      ["-1", ERROR_MESSAGE.BONUS_RANGE],
    ])("유효하지 않은 입력 %p는 %p 예외가 발생한다", (input, errorMessage) => {
      expect(() => validateBonusNumber(input)).toThrow(errorMessage);
    });
  });
});