import {MissionUtils} from "@woowacourse/mission-utils";
import {LOTTERY_NUMBER_COUNT, LOTTO_PRICE, WINNING_NUMBER_MAX, WINNING_NUMBER_MIN} from "../constants/config.js";

export const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

export const createLottoNumbers = () => {
  return MissionUtils.Random.pickUniqueNumbersInRange(WINNING_NUMBER_MIN, WINNING_NUMBER_MAX, LOTTERY_NUMBER_COUNT);
};

export const throwIfAny = (items, predicate, errorMessage) => {
  if (items.some(predicate)) throw new Error(errorMessage);
  return items;
};

export const getLottoCount = (money) => {
  return money / LOTTO_PRICE;
};

export const getProfitRate = (totalPrize, cost, fractionDigits = 1) => {
  const rate = (totalPrize / cost) * 100;
  const multiplier = Math.pow(10, fractionDigits);
  const rounded = Math.round(rate * multiplier) / multiplier;

  return rounded.toFixed(fractionDigits);
};
