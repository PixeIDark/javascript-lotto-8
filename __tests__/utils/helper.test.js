import {createLottoNumbers, getLottoCount, getProfitRate, pipe, throwIfAny} from "../../src/utils/helper.js";
import {LOTTERY_NUMBER_COUNT, WINNING_NUMBER_MAX, WINNING_NUMBER_MIN} from "../../src/constants/config.js";

describe("헬퍼 함수 테스트", () => {
  describe("pipe", () => {
    test("함수들을 순차적으로 실행한다.", () => {
      const add5 = (x) => x + 5;
      const multiply2 = (x) => x * 2;
      const subtract3 = (x) => x - 3;
      const result = pipe(add5, multiply2, subtract3)(10);
      expect(result).toBe((10 + 5) * 2 - 3);
    });

    test("단일 함수도 처리한다.", () => {
      const double = (x) => x * 2;
      const result = pipe(double)(5);
      expect(result).toBe(10);
    });

    test("함수가 없을 때 원본 값을 반환한다.", () => {
      const result = pipe()(42);
      expect(result).toBe(42);
    });
  });

  describe("createLottoNumbers", () => {
    test("6개의 고유한 숫자를 반환한다.", () => {
      const numbers = createLottoNumbers();
      expect(numbers).toHaveLength(LOTTERY_NUMBER_COUNT);
      expect(new Set(numbers).size).toBe(LOTTERY_NUMBER_COUNT);
    });

    test("모든 숫자가 범위 내에 있다.", () => {
      const numbers = createLottoNumbers();

      numbers.forEach((number) => {
        expect(number).toBeGreaterThanOrEqual(WINNING_NUMBER_MIN);
        expect(number).toBeLessThanOrEqual(WINNING_NUMBER_MAX);
      });
    });

    test("여러 번 호출해도 다양한 결과를 반환한다.", () => {
      const set = new Set();

      for (let i = 0; i < 10; i++) {
        const numbers = createLottoNumbers();
        set.add(JSON.stringify(numbers.sort((a, b) => a - b)));
      }

      expect(set.size).toBeGreaterThan(1);
    });
  });

  describe("throwIfAny", () => {
    test("조건을 만족하는 항목이 없으면 배열을 반환한다.", () => {
      const items = [1, 2, 3, 4, 5];
      const result = throwIfAny(items, (x) => x > 10, "error");

      expect(result).toEqual(items);
    });

    test.each([
      [[1, 2, 3, 4, 5], (x) => x > 3, "숫자가 너무 크다"],
      [[1, 2, 3, 4, 5], (x) => x === 2, "[ERROR] 2는 안 됨"],
    ])("조건을 만족하는 항목 있을 때 %p에서 에러 발생", (items, predicate, errorMessage) => {
      expect(() => throwIfAny(items, predicate, errorMessage)).toThrow(errorMessage);
    });

    test("빈 배열은 에러를 던지지 않는다.", () => {
      const result = throwIfAny([], (x) => x > 0, "error");
      expect(result).toEqual([]);
    });
  });

  describe("getLottoCount", () => {
    test.each([
      [1000, 1],
      [8000, 8],
      [14000, 14],
    ])("돈 %p을 로또 개수로 변환: %p", (input, expected) => {
      expect(getLottoCount(input)).toBe(expected);
    });

    test("0원을 입력하면 0을 반환한다.", () => {
      expect(getLottoCount(0)).toBe(0);
    });

    test("소수 결과를 반환할 수 있다.", () => {
      expect(getLottoCount(1500)).toBe(1.5);
    });
  });

  describe("getProfitRate", () => {
    test.each([
      [5000, 8000, "62.5"],
      [10000, 5000, "200.0"],
    ])("수익률 계산 총상금 %p, 비용 %p → %p", (totalPrize, cost, expected) => {
      expect(getProfitRate(totalPrize, cost)).toBe(expected);
    });

    test.each([
      [5555, 10000, 1, "55.6"],
      [5555, 10000, 2, "55.55"],
      [5555, 10000, 0, "56"],
    ])("소수점 자리 지정 %p / %p, %p자리 → %p", (totalPrize, cost, fractionDigits, expected) => {
      expect(getProfitRate(totalPrize, cost, fractionDigits)).toBe(expected);
    });

    test("100% 수익률을 계산한다.", () => {
      expect(getProfitRate(10000, 10000)).toBe("100.0");
    });

    test("수익 손실을 계산한다.", () => {
      expect(getProfitRate(5000, 10000)).toBe("50.0");
    });
  });
});