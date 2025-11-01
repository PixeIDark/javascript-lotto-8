import {ERROR_MESSAGE} from "../constants/message.js";

class WinningLotto {
  #winningNumbers;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#validate(winningNumbers, bonusNumber);
    this.#winningNumbers = new Set(winningNumbers);
    this.#bonusNumber = bonusNumber;
  }

  #validate(winningNumbers, bonusNumber) {
    if (winningNumbers.includes(bonusNumber)) throw new Error(ERROR_MESSAGE.BONUS_DUPLICATE);
  }

  getWinningNumbers() {
    return this.#winningNumbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }
}

export default WinningLotto;
