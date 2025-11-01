import LottoCollection from "../model/LottoCollection.js";
import WinningStatistics from "../model/WinningStatistics.js";
import WinningLotto from "../model/WinningLotto.js";
import {handleInput, readBonusNumber, readPurchaseAmount, readWinningNumbers} from "../utils/inputHandler.js";
import {formatLottoTickets} from "../utils/formatter.js";
import {getLottoCount, getProfitRate} from "../utils/helper.js";

class LottoController {
  #output;

  constructor(output) {
    this.#output = output;
  }

  async execute() {
    const {money, lottoCount} = await this.#handlePurchase();
    const tickets = this.#handleLottoGeneration(lottoCount);
    await this.#handleResult(tickets, money);
  }

  async #handlePurchase() {
    const money = await handleInput(readPurchaseAmount, (message) => this.#output.printError(message));
    const lottoCount = getLottoCount(money);
    this.#output.printCount(lottoCount);

    return {money, lottoCount};
  }

  #handleLottoGeneration(lottoCount) {
    const lottoCollection = new LottoCollection(lottoCount);
    const tickets = lottoCollection.getTickets();
    const formattedTickets = formatLottoTickets(tickets);
    this.#output.printLottoNumbers(formattedTickets);

    return tickets;
  }

  async #handleResult(tickets, money) {
    const winningLotto = await this.#getWinningLottoWithRetry();
    this.#displayStatistics(tickets, winningLotto, money);
  }

  async #getWinningLottoWithRetry() {
    try {
      const winningNumbers = await handleInput(readWinningNumbers, (message) => this.#output.printError(message));
      const bonusNumber = await handleInput(readBonusNumber, (message) => this.#output.printError(message));

      return new WinningLotto(winningNumbers, bonusNumber);
    } catch (error) {
      this.#output.printError(error.message);
      return this.#getWinningLottoWithRetry();
    }
  }

  #displayStatistics(tickets, winningLotto, money) {
    const statistics = new WinningStatistics(tickets, winningLotto);
    const rate = getProfitRate(statistics.getTotalPrize(), money);
    this.#output.printResult(statistics.getDetailedResults());
    this.#output.printProfitRate(rate);
  }
}

export default LottoController;