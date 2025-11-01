import {validatePurchaseAmount} from "./validator/purchase.js";
import {validateWinningNumber} from "./validator/winningNumber.js";
import {validateBonusNumber} from "./validator/bonusNumber.js";
import {INPUT_MESSAGES} from "../constants/message.js";
import {MissionUtils} from "@woowacourse/mission-utils";

export const handleInput = async (validator, onError) => {
  try {
    return await validator();
  } catch (error) {
    onError(error.message);
    return handleInput(validator, onError);
  }
};

export const readPurchaseAmount = async () => {
  const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGES.MONEY);
  return validatePurchaseAmount(input);
};

export const readWinningNumbers = async () => {
  const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGES.WINNING_NUMBERS);
  return validateWinningNumber(input);
};

export const readBonusNumber = async () => {
  const input = await MissionUtils.Console.readLineAsync(INPUT_MESSAGES.BONUS_NUMBER);
  return validateBonusNumber(input);
};