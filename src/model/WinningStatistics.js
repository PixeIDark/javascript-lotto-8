import {MIN_WINNING_RANK, PRIZE_INFO} from "../constants/business.js";

class WinningStatistics {
  #rankCounts;

  constructor(lottoTickets, winningLotto) {
    this.#rankCounts = new Map(Object.keys(PRIZE_INFO).map(rank => [Number(rank), 0]).toSorted((a, b) => a[0] - b[0]));
    this.#calculate(lottoTickets, winningLotto);
  }

  #calculate(lottoTickets, winningLotto) {
    lottoTickets.forEach(ticket => {
      const rank = ticket.getRank(winningLotto);
      if (rank >= MIN_WINNING_RANK) this.#incrementCount(rank);
    });
  }

  #incrementCount(rank) {
    this.#rankCounts.set(rank, this.#rankCounts.get(rank) + 1);
  }

  getDetailedResults() {
    return Array.from(this.#rankCounts).map(([rank, count]) => {
      const {display, amount} = PRIZE_INFO[rank];
      return {display, amount, count};
    });
  }

  getTotalPrize() {
    return Array.from(this.#rankCounts).reduce((total, [rank, count]) => total + PRIZE_INFO[rank].amount * count, 0);
  }
}

export default WinningStatistics;