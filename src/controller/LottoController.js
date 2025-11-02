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
    const {money, lottoCount} = await this.#getPurchaseAmount();
    const tickets = await this.#generateTickets(lottoCount);
    const winningLotto = await this.#getWinningLotto();
    await this.#displayResults(tickets, winningLotto, money);
  }

  async #getPurchaseAmount() {
    const money = await this.#getValidInput(readPurchaseAmount);
    const lottoCount = getLottoCount(money);
    this.#output.printCount(lottoCount);

    return {money, lottoCount};
  }

  async #generateTickets(lottoCount) {
    const tickets = new LottoCollection(lottoCount).getTickets();
    this.#output.printLottoNumbers(formatLottoTickets(tickets));

    return tickets;
  }

  async #getWinningLotto() {
    try {
      const winningNumbers = await this.#getValidInput(readWinningNumbers);
      const bonusNumber = await this.#getValidInput(readBonusNumber);

      return new WinningLotto(winningNumbers, bonusNumber);
    } catch (error) {
      this.#output.printError(error.message);
      return this.#getWinningLotto();
    }
  }

  async #displayResults(tickets, winningLotto, money) {
    const statistics = new WinningStatistics(tickets, winningLotto);
    this.#output.printResult(statistics.getDetailedResults());
    this.#output.printProfitRate(getProfitRate(statistics.getTotalPrize(), money));
  }

  async #getValidInput(inputReader) {
    return handleInput(inputReader, (message) => this.#output.printError(message));
  }
}

export default LottoController;