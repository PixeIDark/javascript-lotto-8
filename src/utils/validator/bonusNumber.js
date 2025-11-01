import {WINNING_NUMBER_MAX, WINNING_NUMBER_MIN} from "../../constants/config.js";
import {pipe} from "../helper.js";
import {ERROR_MESSAGE} from "../../constants/message.js";

export const validateBonusBlank = (input) => {
  if (input.trim().length === 0) throw new Error(ERROR_MESSAGE.BONUS_BLANK);
  return input.trim();
};

export const validateBonusNumeric = (input) => {
  const parsed = Number(input);
  if (isNaN(parsed)) throw new Error(ERROR_MESSAGE.BONUS_NUMBER_FORMAT);

  return parsed;
};

export const validateBonusInteger = (number) => {
  if (!Number.isInteger(number)) throw new Error(ERROR_MESSAGE.BONUS_INTEGER);
  return number;
};

export const validateBonusRange = (number) => {
  if (number < WINNING_NUMBER_MIN || number > WINNING_NUMBER_MAX) throw new Error(ERROR_MESSAGE.BONUS_RANGE);
  return number;
};

export const validateBonusNumber = pipe(
  validateBonusBlank,
  validateBonusNumeric,
  validateBonusInteger,
  validateBonusRange,
);