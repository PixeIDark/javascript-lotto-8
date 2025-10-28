// 제공된 Lotto 클래스를 사용하여 구현해야 한다.
// Lotto에 numbers 이외의 필드(인스턴스 변수)를 추가할 수 없다.
// numbers의 접근 제어자인 #은 변경할 수 없다.
// Lotto의 패키지를 변경할 수 있다. => 파일 위치 바꿔도됨
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  getNumber() {
    return this.#numbers;
  }

  // TODO: 추가 기능 구현
}

export default Lotto;
