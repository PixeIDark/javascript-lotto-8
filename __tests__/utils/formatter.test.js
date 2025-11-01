import Lotto from "../../src/model/Lotto.js";
import {formatCurrency, formatLottoTickets} from "../../src/utils/formatter.js";

describe("포매터 테스트", () => {
  describe("formatLottoTickets", () => {
    test("로또 티켓들을 포매팅된 문자열로 반환한다.", () => {
      const tickets = [
        new Lotto([1, 2, 3, 4, 5, 6]),
        new Lotto([7, 8, 9, 10, 11, 12]),
      ];
      const result = formatLottoTickets(tickets);
      expect(result).toBe("[1, 2, 3, 4, 5, 6]\n[7, 8, 9, 10, 11, 12]");
    });

    test("단일 로또 티켓을 포매팅한다.", () => {
      const tickets = [new Lotto([10, 20, 30, 40, 45, 5])];
      const result = formatLottoTickets(tickets);
      expect(result).toBe("[5, 10, 20, 30, 40, 45]");
    });

    test("빈 배열을 입력하면 빈 문자열을 반환한다.", () => {
      const tickets = [];
      const result = formatLottoTickets(tickets);
      expect(result).toBe("");
    });
  });

  describe("formatCurrency", () => {
    test.each([
      [1000, "1,000"],
      [5000, "5,000"],
      [10000, "10,000"],
    ])("숫자 %p를 한국 통화 형식으로 포매팅: %p", (input, expected) => {
      expect(formatCurrency(input)).toBe(expected);
    });

    test.each([
      [1000000, "1,000,000"],
      [2000000000, "2,000,000,000"],
    ])("큰 숫자 %p를 포매팅: %p", (input, expected) => {
      expect(formatCurrency(input)).toBe(expected);
    });

    test("0을 포매팅한다.", () => {
      expect(formatCurrency(0)).toBe("0");
    });

    test("소수를 포매팅한다.", () => {
      expect(formatCurrency(1000.5)).toBe("1,000.5");
    });
  });
});