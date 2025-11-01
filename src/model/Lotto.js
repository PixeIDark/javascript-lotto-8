import {ERROR_MESSAGE} from "../constants/message.js";
import {LOTTERY_NUMBER_COUNT, WINNING_NUMBER_MAX, WINNING_NUMBER_MIN} from "../constants/config.js";
import {throwIfAny} from "../utils/helper.js";
import {BONUS_RANK, BONUS_RANK_WITH_BONUS} from "../constants/business.js";

export class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers.toSorted((a, b) => a - b);
  }

  #validate(numbers) {
    this.#validateLength(numbers);
    this.#validateDuplicate(numbers);
    this.#validateInteger(numbers);
    this.#validateRange(numbers);
  }

  #validateLength(numbers) {
    if (numbers.length !== LOTTERY_NUMBER_COUNT) throw new Error(ERROR_MESSAGE.LOTTO_LENGTH);
  }

  #validateDuplicate(numbers) {
    if (new Set(numbers).size !== LOTTERY_NUMBER_COUNT) throw new Error(ERROR_MESSAGE.LOTTO_DUPLICATE);
  }

  #validateInteger(numbers) {
    throwIfAny(numbers, (number) => !Number.isInteger(number), ERROR_MESSAGE.LOTTO_INTEGER);
  }

  #validateRange(numbers) {
    throwIfAny(numbers, (number) => number < WINNING_NUMBER_MIN || number > WINNING_NUMBER_MAX, ERROR_MESSAGE.LOTTO_RANGE);
  }

  getNumbers() {
    return [...this.#numbers];
  }

  getRank(winningLotto) {
    const matchCount = this.#matchNumbers(winningLotto.getWinningNumbers());
    if (matchCount === BONUS_RANK && this.#hasBonusNumber(winningLotto.getBonusNumber())) return BONUS_RANK_WITH_BONUS;

    return matchCount;
  }

  #matchNumbers(winningNumbers) {
    return this.#numbers.filter(number => winningNumbers.has(number)).length;
  }

  #hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;