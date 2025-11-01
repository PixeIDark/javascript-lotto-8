import {LOTTERY_NUMBER_COUNT, WINNING_NUMBER_MAX, WINNING_NUMBER_MIN} from "./config.js";

export const INPUT_MESSAGES = {
  MONEY: "구입 금액을 입력해 주세요.\n",
  WINNING_NUMBERS: "\n당첨 번호를 입력해 주세요.\n",
  BONUS_NUMBER: "\n보너스 번호를 입력해 주세요.\n",
};

export const OUTPUT_MESSAGES = {
  PURCHASE_COUNT: (count) => `\n${count}개를 구매했습니다.`,
  PURCHASE_RESULT: (display, money, count) => `${display} (${money}원) - ${count}개`,
  WIN_STATISTICS: "\n당첨 통계",
  SEPARATOR: "---",
  PROFIT_RATE: (rate) => `총 수익률은 ${rate}%입니다.`,
};

export const ERROR_MESSAGE = {
  PURCHASE_BLANK: "[ERROR] 구입 금액을 입력해주세요.",
  PURCHASE_NUMBER_FORMAT: "[ERROR] 구입 금액은 숫자여야 합니다.",
  PURCHASE_INTEGER: "[ERROR] 구입 금액은 정수여야 합니다.",
  PURCHASE_INSUFFICIENT_AMOUNT: `[ERROR] 구입 금액은 최소 1,000원 이상이어야 합니다.`,
  PURCHASE_UNIT: `[ERROR] 구입 금액은 1,000원 단위여야 합니다.`,

  LOTTO_LENGTH: "[ERROR] 로또 번호는 6개여야 합니다.",
  LOTTO_DUPLICATE: "[ERROR] 로또 번호에 중복된 숫자가 있습니다.",
  LOTTO_INTEGER: "[ERROR] 로또 번호는 정수여야 합니다.",
  LOTTO_RANGE: `[ERROR] 로또 번호는 ${WINNING_NUMBER_MIN}부터 ${WINNING_NUMBER_MAX} 사이의 숫자여야 합니다.`,

  WINNING_BLANK: "[ERROR] 당첨 번호를 입력해주세요.",
  WINNING_FORMAT: "[ERROR] 당첨 번호는 쉼표로 구분하여 입력해주세요.",
  WINNING_ARRAY: "[ERROR] 당첨 번호는 배열이어야 합니다.",
  WINNING_LENGTH: `[ERROR] 당첨 번호는 ${LOTTERY_NUMBER_COUNT}개여야 합니다.`,
  WINNING_NUMBER_FORMAT: "[ERROR] 당첨 번호는 숫자여야 합니다.",
  WINNING_RANGE: `[ERROR] 당첨 번호는 ${WINNING_NUMBER_MIN}부터 ${WINNING_NUMBER_MAX} 사이의 숫자여야 합니다.`,
  WINNING_DUPLICATE: "[ERROR] 당첨 번호에 중복된 숫자가 있습니다.",

  BONUS_BLANK: "[ERROR] 보너스 번호를 입력해주세요.",
  BONUS_NUMBER_FORMAT: "[ERROR] 보너스 번호는 숫자여야 합니다.",
  BONUS_INTEGER: "[ERROR] 보너스 번호는 정수여야 합니다.",
  BONUS_RANGE: `[ERROR] 보너스 번호는 ${WINNING_NUMBER_MIN}부터 ${WINNING_NUMBER_MAX} 사이의 숫자여야 합니다.`,
  BONUS_DUPLICATE: "[ERROR] 보너스 번호는 당첨 번호와 중복되면 안 됩니다.",
};