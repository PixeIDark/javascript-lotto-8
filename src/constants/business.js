// 게임 규칙 (고정) => 상수가 서로 의존성이 높음
export const MIN_WINNING_RANK = 3;
export const BONUS_RANK = 5;
export const BONUS_RANK_WITH_BONUS = 5.5;

export const PRIZE_INFO = {
  3: {display: "3개 일치", amount: 5000},
  4: {display: "4개 일치", amount: 50000},
  5: {display: "5개 일치", amount: 1500000},
  5.5: {display: "5개 일치, 보너스 볼 일치", amount: 30000000},
  6: {display: "6개 일치", amount: 2000000000},
};