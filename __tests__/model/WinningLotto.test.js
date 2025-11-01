import WinningLotto from "../../src/model/WinningLotto.js";
import {ERROR_MESSAGE} from "../../src/constants/message.js";

describe("WinningLotto 테스트", () => {
  describe("constructor", () => {
    test("유효한 당첨 번호와 보너스 번호로 생성된다.", () => {
      const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
      expect(winningLotto.getWinningNumbers()).toEqual(new Set([1, 2, 3, 4, 5, 6]));
      expect(winningLotto.getBonusNumber()).toBe(7);
    });

    test.each([
      [[1, 2, 3, 4, 5, 6], 6],
      [[1, 2, 3, 4, 5, 7], 7],
      [[10, 20, 30, 40, 45, 1], 1],
    ])("당첨 번호 %p와 보너스 번호 %p가 중복되면 예외가 발생한다", (winningNumbers, bonusNumber) => {
      expect(() => new WinningLotto(winningNumbers, bonusNumber)).toThrow(
        ERROR_MESSAGE.BONUS_DUPLICATE,
      );
    });

    test("보너스 번호가 당첨 번호에 없으면 정상 생성된다.", () => {
      expect(() => new WinningLotto([1, 2, 3, 4, 5, 6], 45)).not.toThrow();
    });
  });

  describe("getWinningNumbers", () => {
    test("당첨 번호를 Set으로 반환한다.", () => {
      const winningLotto = new WinningLotto([1, 2, 3, 4, 5, 6], 7);
      const winningNumbers = winningLotto.getWinningNumbers();

      expect(winningNumbers).toEqual(new Set([1, 2, 3, 4, 5, 6]));
    });

    test("순서와 관계없이 Set으로 반환한다.", () => {
      const winningLotto = new WinningLotto([6, 1, 5, 3, 2, 4], 7);
      const winningNumbers = winningLotto.getWinningNumbers();
      
      expect(winningNumbers).toEqual(new Set([1, 2, 3, 4, 5, 6]));
    });
  });

  describe("getBonusNumber", () => {
    test.each([
      [[1, 2, 3, 4, 5, 6], 7],
      [[10, 20, 30, 40, 45, 1], 2],
      [[5, 15, 25, 35, 40, 43], 44],
    ])("보너스 번호를 반환한다: %p → %p", (winningNumbers, bonusNumber) => {
      const winningLotto = new WinningLotto(winningNumbers, bonusNumber);
      expect(winningLotto.getBonusNumber()).toBe(bonusNumber);
    });
  });
});