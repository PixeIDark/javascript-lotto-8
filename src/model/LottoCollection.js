import {createLottoNumbers} from "../utils/helper.js";
import {Lotto} from "./Lotto.js";

class LottoCollection {
  #tickets;

  constructor(count) {
    this.#tickets = this.#generateTickets(count);
  }

  #generateTickets(count) {
    return Array.from({length: count}, () => new Lotto(createLottoNumbers()));
  }

  getTickets() {
    return [...this.#tickets];
  }
}

export default LottoCollection;