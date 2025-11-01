import LottoCollection from "../../src/model/LottoCollection.js";
import {LOTTERY_NUMBER_COUNT} from "../../src/constants/config.js";

describe("LottoCollection 테스트", () => {
  describe("constructor", () => {
    test.each([[1], [5], [10], [100]])("지정한 개수 %p만큼 로또를 생성한다", (count) => {
      const collection = new LottoCollection(count);
      expect(collection.getTickets()).toHaveLength(count);
    });

    test("0개를 생성할 수 있다.", () => {
      const collection = new LottoCollection(0);
      expect(collection.getTickets()).toHaveLength(0);
    });
  });

  describe("getTickets", () => {
    test("모든 티켓이 유효한 로또이다.", () => {
      const collection = new LottoCollection(10);
      const tickets = collection.getTickets();

      tickets.forEach((ticket) => {
        const numbers = ticket.getNumbers();
        expect(numbers).toHaveLength(LOTTERY_NUMBER_COUNT);
        expect(new Set(numbers).size).toBe(LOTTERY_NUMBER_COUNT);
      });
    });

    test("원본을 수정해도 컬렉션은 변경되지 않는다.", () => {
      const collection = new LottoCollection(3);
      const tickets = collection.getTickets();

      tickets.pop();

      expect(collection.getTickets()).toHaveLength(3);
    });

    test("여러 번 호출해도 같은 티켓을 반환한다.", () => {
      const collection = new LottoCollection(5);
      const tickets1 = collection.getTickets();
      const tickets2 = collection.getTickets();

      expect(tickets1.map((t) => t.getNumbers())).toEqual(
        tickets2.map((t) => t.getNumbers()),
      );
    });

    test("각 로또의 번호는 고유하다.", () => {
      const collection = new LottoCollection(50);
      const tickets = collection.getTickets();
      const numberStrings = tickets.map((ticket) =>
        JSON.stringify(ticket.getNumbers().sort((a, b) => a - b)),
      );
      const uniqueSet = new Set(numberStrings);

      expect(uniqueSet.size).toBeGreaterThan(1);
    });
  });
});