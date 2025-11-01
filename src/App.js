import Output from "./view/Output.js";
import LottoController from "./controller/LottoController.js";

class App {
  async run() {
    const lottoController = new LottoController(new Output());
    await lottoController.execute();
  }
}

export default App;