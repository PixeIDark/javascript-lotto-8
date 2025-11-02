import {MissionUtils} from "@woowacourse/mission-utils";
import {OUTPUT_MESSAGES} from "../constants/message.js";
import {formatCurrency} from "../utils/formatter.js";

class Output {
  printCount(count) {
    MissionUtils.Console.print(OUTPUT_MESSAGES.PURCHASE_COUNT(count));
  }

  printLottoNumbers(ticketsString) {
    MissionUtils.Console.print(ticketsString);
  }

  printResult(rankResults) {
    MissionUtils.Console.print(OUTPUT_MESSAGES.WIN_STATISTICS);
    MissionUtils.Console.print(OUTPUT_MESSAGES.SEPARATOR);
    rankResults.forEach(result => this.#printRankResult(result));
  }

  #printRankResult({display, amount, count}) {
    const money = formatCurrency(amount);
    MissionUtils.Console.print(OUTPUT_MESSAGES.WINNING_RESULT(display, money, count));
  }

  printProfitRate(rate) {
    MissionUtils.Console.print(OUTPUT_MESSAGES.PROFIT_RATE(rate));
  }

  printError(message) {
    MissionUtils.Console.print(message);
  }
}

export default Output;