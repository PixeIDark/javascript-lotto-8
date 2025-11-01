import {pipe, throwIfAny} from "../helper.js";
import {LOTTERY_NUMBER_COUNT, WINNING_NUMBER_MAX, WINNING_NUMBER_MIN} from "../../constants/config.js";
import {ERROR_MESSAGE} from "../../constants/message.js";

export const validateWinningBlank = (input) => {
  if (input.trim().length === 0) throw new Error(ERROR_MESSAGE.WINNING_BLANK);

  return input.trim();
};

export const validateWinningFormat = (input) => {
  const numbers = input.split(",");
  if (numbers.length !== LOTTERY_NUMBER_COUNT) throw new Error(ERROR_MESSAGE.WINNING_LENGTH);

  return numbers;
};

export const validateWinningNumeric = (numbers) => {
  return numbers.map((num) => {
    const parsed = Number(num.trim());
    if (isNaN(parsed)) throw new Error(ERROR_MESSAGE.WINNING_NUMBER_FORMAT);

    return parsed;
  });
};

export const validateWinningRange = (numbers) => {
  return throwIfAny(numbers, (number) => number < WINNING_NUMBER_MIN || number > WINNING_NUMBER_MAX, ERROR_MESSAGE.WINNING_RANGE);
};

export const validateWinningDuplicate = (numbers) => {
  if (new Set(numbers).size !== numbers.length) throw new Error(ERROR_MESSAGE.WINNING_DUPLICATE);
  return numbers;
};

export const validateWinningNumber = pipe(
  validateWinningBlank,
  validateWinningFormat,
  validateWinningNumeric,
  validateWinningRange,
  validateWinningDuplicate,
);