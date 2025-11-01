import WinningStatistics from "../../src/model/WinningStatistics.js";
import Lotto from "../../src/model/Lotto.js";

describe("WinningStatistics 테스트", () => {
  describe("constructor", () => {
    test("당첨 통계를 계산한다.", () => {
      const tickets = [
        new Lotto([1, 2, 3, 4, 5, 6]),
        new Lotto([1, 2, 3, 4, 5, 10]),
      ];
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const statistics = new WinningStatistics(tickets, winningLotto);

      expect(statistics.getDetailedResults()).toBeDefined();
    });

    test("빈 티켓 배열도 처리한다.", () => {
      const tickets = [];
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const statistics = new WinningStatistics(tickets, winningLotto);
      const results = statistics.getDetailedResults();
      results.forEach((result) => {
        expect(result.count).toBe(0);
      });
    });
  });

  describe("getDetailedResults", () => {
    test("모든 등수의 당첨 정보를 반환한다.", () => {
      const tickets = [
        new Lotto([1, 2, 3, 4, 5, 6]),
        new Lotto([1, 2, 3, 4, 5, 10]),
        new Lotto([1, 2, 3, 4, 7, 8]),
        new Lotto([1, 2, 3, 7, 8, 9]),
      ];
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const statistics = new WinningStatistics(tickets, winningLotto);
      const results = statistics.getDetailedResults();

      expect(results).toHaveLength(5);
      expect(results.find((r) => r.display === "3개 일치").count).toBe(1);
      expect(results.find((r) => r.display === "4개 일치").count).toBe(1);
      expect(results.find((r) => r.display === "5개 일치").count).toBe(1);
      expect(results.find((r) => r.display === "6개 일치").count).toBe(1);
    });

    test("각 결과에 display, amount, count가 포함된다.", () => {
      const tickets = [new Lotto([1, 2, 3, 4, 5, 6])];
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };

      const statistics = new WinningStatistics(tickets, winningLotto);
      const results = statistics.getDetailedResults();

      results.forEach((result) => {
        expect(result).toHaveProperty("display");
        expect(result).toHaveProperty("amount");
        expect(result).toHaveProperty("count");
        expect(typeof result.display).toBe("string");
        expect(typeof result.amount).toBe("number");
        expect(typeof result.count).toBe("number");
      });
    });

    test("5개 일치 + 보너스 정보를 반환한다.", () => {
      const tickets = [new Lotto([1, 2, 3, 4, 5, 7])];
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const statistics = new WinningStatistics(tickets, winningLotto);
      const results = statistics.getDetailedResults();
      const bonusResult = results.find((r) => r.display === "5개 일치, 보너스 볼 일치");

      expect(bonusResult.count).toBe(1);
      expect(bonusResult.amount).toBe(30000000);
    });

    test("당첨 없는 로또는 카운트되지 않는다.", () => {
      const tickets = [new Lotto([10, 11, 12, 13, 14, 15])];
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const statistics = new WinningStatistics(tickets, winningLotto);
      const results = statistics.getDetailedResults();

      results.forEach((result) => {
        expect(result.count).toBe(0);
      });
    });
  });

  describe("getTotalPrize", () => {
    test.each([
      [[[1, 2, 3, 4, 5, 6]], 2000000000],
      [[[1, 2, 3, 4, 5, 10]], 1500000],
      [[[1, 2, 3, 4, 7, 8]], 50000],
      [[[1, 2, 3, 7, 8, 9]], 5000],
    ])("단일 당첨 티켓의 총 상금: %p → %p", (numberArrays, expectedTotal) => {
      const tickets = numberArrays.map((numbers) => new Lotto(numbers));
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const statistics = new WinningStatistics(tickets, winningLotto);

      expect(statistics.getTotalPrize()).toBe(expectedTotal);
    });

    test("여러 당첨 티켓의 총 상금을 계산한다.", () => {
      const tickets = [
        new Lotto([1, 2, 3, 4, 5, 6]),
        new Lotto([1, 2, 3, 4, 5, 10]),
      ];
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const statistics = new WinningStatistics(tickets, winningLotto);

      expect(statistics.getTotalPrize()).toBe(2000000000 + 1500000);
    });

    test("당첨이 없으면 0을 반환한다.", () => {
      const tickets = [new Lotto([10, 11, 12, 13, 14, 15])];
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const statistics = new WinningStatistics(tickets, winningLotto);

      expect(statistics.getTotalPrize()).toBe(0);
    });

    test("5개 일치 + 보너스 상금을 포함한다.", () => {
      const tickets = [new Lotto([1, 2, 3, 4, 5, 7])];
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const statistics = new WinningStatistics(tickets, winningLotto);

      expect(statistics.getTotalPrize()).toBe(30000000);
    });

    test("복합 당첨 계산.", () => {
      const tickets = [
        new Lotto([1, 2, 3, 4, 5, 6]),    // 6개: 2,000,000,000
        new Lotto([1, 2, 3, 4, 5, 7]),    // 5+보너스: 30,000,000
        new Lotto([1, 2, 3, 4, 7, 8]),    // 4개: 50,000
        new Lotto([1, 2, 3, 7, 8, 9]),    // 3개: 5,000
      ];
      const winningLotto = {
        getWinningNumbers: () => new Set([1, 2, 3, 4, 5, 6]),
        getBonusNumber: () => 7,
      };
      const statistics = new WinningStatistics(tickets, winningLotto);

      expect(statistics.getTotalPrize()).toBe(2000000000 + 30000000 + 50000 + 5000);
    });
  });
});