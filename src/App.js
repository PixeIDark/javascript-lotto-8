import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    const money = await MissionUtils.Console.readLineAsync("돈줘\n");
    const count = Number(money) / 1000
    // 1. 입력값 체크 음수인지도
    if(isNaN(count)) throw new Error("입력값 숫자아님")

    if(!Number.isInteger(count)) throw new Error("소수, 돈 1000원 단위로")

    const lottos = []

    for(let i = 0; i < count; i++) {
      const a = MissionUtils.Random.pickUniqueNumbersInRange(1, 10, 6);
      lottos.push(new Lotto(a));
    }

    // 2. 당첨 번호 가공
    const winningStr = await MissionUtils.Console.readLineAsync("당첨 번호 6개 입력\n");
    let bonus = await MissionUtils.Console.readLineAsync("보너스 1개 입력\n");
    bonus = Number(bonus);

    const winningSet = new Set(winningStr.split(",").map(Number));

    // 3. 당첨 번호와 로또 번호 비교 해서 맵 객체에 개수 저장
    const map = new Map([[6, 0], [5.5, 0], [5, 0], [4, 0], [3, 0]])

    for(const lotto of lottos) {
      let find = 0

      for(const number of lotto.getNumber()) {
        if(winningSet.has(number)) find++
      }

      if(find === 5 && lotto.getNumber().includes(bonus)) find += 0.5

      if(map.has(find)) map.set(find, map.get(find) + 1)
    }

    // 4. map 객체 순회해서 출력
    // 3개 일치 (5,000원) - 1개
    // - 1등: 6개 번호 일치 / 2,000,000,000원
    // - 2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
    // - 3등: 5개 번호 일치 / 1,500,000원
    // - 4등: 4개 번호 일치 / 50,000원
    // - 5등: 3개 번호 일치 / 5,000원
    let totalIncome = 0

    for(const [key, value] of map) {
      let income = value * 2000000000
      totalIncome += income

      if(key === 5.5) MissionUtils.Console.print(`5개 일치, 보너스 볼 일치 (${income}원) - ${value}개`)
      else MissionUtils.Console.print(`${key}개 일치 (${income}원) - ${value}개`)
    }

    const percentageIncome = totalIncome * 100 / money
    MissionUtils.Console.print(`총 수익률은 ${percentageIncome}%입니다.`)


  }
}

export default App;
