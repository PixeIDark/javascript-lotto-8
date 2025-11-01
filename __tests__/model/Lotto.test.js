import Lotto from "../../src/model/Lotto.js";
import {ERROR_MESSAGE} from "../../src/constants/message.js";

describe("Lotto 테스트", () => {
  describe("constructor", () => {
    test("유효한 로또 번호로 생성된다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("번호가 자동으로 정렬된다.", () => {
      const lotto = new Lotto([6, 5, 4, 3, 2, 1]);
      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });


  describe("validate - 길이", () => {
    test.each([[5], [7], [-3]])("6개가 아닌 %p는 예외가 발생한다", (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.LOTTO_LENGTH);
    });

    test("6개이면 예외가 발생하지 않는다.", () => {
      expect(() => new Lotto([1, 2, 3, 4, 5, 6])).not.toThrow();
    });

    test("빈 배열은 예외가 발생한다.", () => {
      expect(() => new Lotto([])).toThrow(ERROR_MESSAGE.LOTTO_LENGTH);
    });
  });

  describe("validate - 중복", () => {
    test.each([
      [[1, 1, 2, 3, 4, 5]],
      [[1, 2, 3, 4, 5, 5]],
      [[1, 1, 1, 1, 1, 1]],
    ])("중복된 번호 %p는 예외가 발생한다", (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.LOTTO_DUPLICATE);
    });

    test("중복이 없으면 예외가 발생하지 않는다.", () => {
      expect(() => new Lotto([1, 2, 3, 4, 5, 6])).not.toThrow();
    });
  });

  describe("validate - 정수", () => {
    test.each([
      [[1.5, 2, 3, 4, 5, 6]],
      [[1, 2, 3, 4, 5, 6.7]],
      [[1.1, 2.2, 3.3, 4.4, 5.5, 6.6]],
    ])("소수 포함 %p는 예외가 발생한다", (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.LOTTO_INTEGER);
    });

    test("모두 정수이면 예외가 발생하지 않는다.", () => {
      expect(() => new Lotto([1, 2, 3, 4, 5, 6])).not.toThrow();
    });
  });

  describe("validate - 범위", () => {
    test.each([
      [[0, 2, 3, 4, 5, 6]],
      [[1, 2, 3, 4, 5, 46]],
      [[-1, 2, 3, 4, 5, 6]],
      [[1, 2, 3, 4, 5, 50]],
    ])("범위 벗어난 %p는 예외가 발생한다", (numbers) => {
      expect(() => new Lotto(numbers)).toThrow(ERROR_MESSAGE.LOTTO_RANGE);
    });

    test.each([
      [[1, 2, 3, 4, 5, 6]],
      [[1, 10, 20, 30, 40, 45]],
    ])("범위 내 %p는 예외가 발생하지 않는다", (numbers) => {
      expect(() => new Lotto(numbers)).not.toThrow();
    });
  });

  describe("getNumbers", () => {
    test("정렬된 번호를 반환한다.", () => {
      const lotto = new Lotto([6, 1, 3, 4, 2, 5]);
      const numbers = lotto.getNumbers();

      expect(numbers).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("원본을 수정해도 로또 번호는 변경되지 않는다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const numbers = lotto.getNumbers();
      numbers[0] = 99;

      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("getRank", () => {
    test("6개 모두 일치하면 6을 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const rank = lotto.getRank(winningLotto);

      expect(rank).toBe(6);
    });

    test("5개 일치하면 5를 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 10]);
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const rank = lotto.getRank(winningLotto);

      expect(rank).toBe(5);
    });

    test("5개 일치하고 보너스 일치하면 5.5를 반환한다.", () => {
      const lotto = new Lotto([1, 2, 3, 4, 5, 7]);
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const rank = lotto.getRank(winningLotto);

      expect(rank).toBe(5.5);
    });

    test.each([
      [[1, 2, 3, 4, 8, 9], 4],
      [[1, 2, 3, 7, 8, 9], 3],
      [[1, 2, 7, 8, 9, 10], 2],
      [[1, 7, 8, 9, 10, 11], 1],
    ])("일치하는 개수 %p는 %p를 반환한다", (numbers, expectedRank) => {
      const lotto = new Lotto(numbers);
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const rank = lotto.getRank(winningLotto);

      expect(rank).toBe(expectedRank);
    });
  });
});