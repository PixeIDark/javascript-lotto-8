import {LOTTO_PRICE} from "../../constants/config.js";
import {pipe} from "../helper.js";
import {ERROR_MESSAGE} from "../../constants/message.js";

export const validatePurchaseBlank = (input) => {
  if (input.trim().length === 0) throw new Error(ERROR_MESSAGE.PURCHASE_BLANK);
  return input.trim();
};

export const validatePurchaseNumeric = (input) => {
  const parsed = Number(input);
  if (isNaN(parsed)) throw new Error(ERROR_MESSAGE.PURCHASE_NUMBER_FORMAT);

  return parsed;
};

export const validatePurchaseInteger = (amount) => {
  if (!Number.isInteger(amount)) throw new Error(ERROR_MESSAGE.PURCHASE_INTEGER);
  return amount;
};

export const validateMinimumAmount = (amount) => {
  if (amount < LOTTO_PRICE) throw new Error(ERROR_MESSAGE.PURCHASE_INSUFFICIENT_AMOUNT);
  return amount;
};

export const validatePurchaseUnit = (amount) => {
  if (amount % LOTTO_PRICE !== 0) throw new Error(ERROR_MESSAGE.PURCHASE_UNIT);
  return amount;
};

export const validatePurchaseAmount = pipe(
  validatePurchaseBlank,
  validatePurchaseNumeric,
  validatePurchaseInteger,
  validateMinimumAmount,
  validatePurchaseUnit,
);