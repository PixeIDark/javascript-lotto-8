import {
  validateMinimumAmount,
  validatePurchaseAmount,
  validatePurchaseBlank,
  validatePurchaseInteger,
  validatePurchaseNumeric,
  validatePurchaseUnit,
} from "../../../src/utils/validator/purchase.js";
import {ERROR_MESSAGE} from "../../../src/constants/message.js";

describe("구매 금액 검증 테스트", () => {
  describe("validatePurchaseBlank", () => {
    test.each([[""], ["   "]])("공백인 문자열 %p는 예외가 발생한다", (input) => {
      expect(() => validatePurchaseBlank(input)).toThrow(ERROR_MESSAGE.PURCHASE_BLANK);
    });

    test.each([[" 3", "3"], [" a   b c ", "a   b c"]])(
      "문자가 존재하면 앞뒤 공백을 제거: %p → %p",
      (input, expected) => {
        expect(validatePurchaseBlank(input)).toBe(expected);
      },
    );
  });

  describe("validatePurchaseNumeric", () => {
    test.each([["abc"], ["12a"]])("숫자가 아닌 문자열 %p는 예외가 발생한다", (input) => {
      expect(() => validatePurchaseNumeric(input)).toThrow(ERROR_MESSAGE.PURCHASE_NUMBER_FORMAT);
    });

    test.each([["1000", 1000], ["8000", 8000]])(
      "숫자 문자열 %p을 숫자로 변환: %p",
      (input, expected) => {
        expect(validatePurchaseNumeric(input)).toBe(expected);
      },
    );
  });

  describe("validatePurchaseInteger", () => {
    test.each([[1000.5], [999.99]])("소수 %p는 예외가 발생한다", (input) => {
      expect(() => validatePurchaseInteger(input)).toThrow(ERROR_MESSAGE.PURCHASE_INTEGER);
    });

    test.each([[1000], [5000]])("정수 %p는 그대로 반환한다", (input) => {
      expect(validatePurchaseInteger(input)).toBe(input);
    });
  });

  describe("validateMinimumAmount", () => {
    test.each([[0], [500], [999]])("1000원 미만 %p는 예외가 발생한다", (input) => {
      expect(() => validateMinimumAmount(input)).toThrow(ERROR_MESSAGE.PURCHASE_INSUFFICIENT_AMOUNT);
    });

    test.each([[1000], [5000]])("1000원 이상 %p는 그대로 반환한다", (input) => {
      expect(validateMinimumAmount(input)).toBe(input);
    });
  });

  describe("validatePurchaseUnit", () => {
    test.each([[1500], [999], [8001]])("1000원 단위가 아닌 %p는 예외가 발생한다", (input) => {
      expect(() => validatePurchaseUnit(input)).toThrow(ERROR_MESSAGE.PURCHASE_UNIT);
    });

    test.each([[1000], [8000], [14000]])("1000원 단위인 %p는 그대로 반환한다", (input) => {
      expect(validatePurchaseUnit(input)).toBe(input);
    });
  });

  describe("validatePurchaseAmount 통합 테스트", () => {
    test.each([["8000", 8000], ["14000", 14000]])(
      "유효한 구매 금액 %p를 숫자로 변환: %p",
      (input, expected) => {
        expect(validatePurchaseAmount(input)).toBe(expected);
      },
    );

    test.each([
      ["  ", ERROR_MESSAGE.PURCHASE_BLANK],
      ["abc", ERROR_MESSAGE.PURCHASE_NUMBER_FORMAT],
      ["500", ERROR_MESSAGE.PURCHASE_INSUFFICIENT_AMOUNT],
      ["8500", ERROR_MESSAGE.PURCHASE_UNIT],
      ["1000.5", ERROR_MESSAGE.PURCHASE_INTEGER],
    ])("유효하지 않은 입력 %p는 %p 예외가 발생한다", (input, errorMessage) => {
      expect(() => validatePurchaseAmount(input)).toThrow(errorMessage);
    });
  });
});