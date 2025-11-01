import {handleInput} from "../../src/utils/inputHandler.js";

describe("inputHandler 테스트", () => {
  describe("handleInput", () => {
    test("유효한 validator는 결과를 반환한다.", async () => {
      const mockValidator = jest.fn().mockResolvedValue(8000);
      const mockOnError = jest.fn();
      const result = await handleInput(mockValidator, mockOnError);

      expect(result).toBe(8000);
      expect(mockValidator).toHaveBeenCalledTimes(1);
      expect(mockOnError).not.toHaveBeenCalled();
    });

    test("validator가 에러를 던지면 onError를 호출한다.", async () => {
      const error = new Error("[ERROR] 테스트 에러");
      const mockValidator = jest.fn().mockRejectedValueOnce(error).mockResolvedValueOnce(5000);
      const mockOnError = jest.fn();
      const result = await handleInput(mockValidator, mockOnError);

      expect(mockOnError).toHaveBeenCalledWith("[ERROR] 테스트 에러");
      expect(result).toBe(5000);
    });

    test("validator가 여러 번 실패 후 성공한다.", async () => {
      const error = new Error("[ERROR] 에러");
      const mockValidator = jest
        .fn()
        .mockRejectedValueOnce(error)
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce(10000);
      const mockOnError = jest.fn();
      const result = await handleInput(mockValidator, mockOnError);

      expect(mockValidator).toHaveBeenCalledTimes(3);
      expect(mockOnError).toHaveBeenCalledTimes(2);
      expect(result).toBe(10000);
    });

    test("에러 메시지를 onError에 전달한다.", async () => {
      const customError = "[ERROR] 구입 금액을 입력해주세요.";
      const mockValidator = jest
        .fn()
        .mockRejectedValueOnce(new Error(customError))
        .mockResolvedValueOnce(3000);
      const mockOnError = jest.fn();
      await handleInput(mockValidator, mockOnError);

      expect(mockOnError).toHaveBeenCalledWith(customError);
    });
  });
});