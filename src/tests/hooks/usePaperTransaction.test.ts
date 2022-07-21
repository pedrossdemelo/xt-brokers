import { usePaperTransaction, useUserData } from "hooks";
import { act, cleanup, renderHook } from "tests";
import { papers } from "tests/mocks";

const mockPaper = papers[0];

describe("usePaperTransaction", () => {
  afterEach(cleanup);

  it("should decrease the shares available when buying", () => {
    const { result, rerender } = renderHook(() => {
      return { ...useUserData(), ...usePaperTransaction(mockPaper) };
    });

    act(() => {
      result.current.buyPaper(20);
    });

    expect(result.current.allPapers[0].qtdeAtivo).toBe(80);
  });

  it("should increase the shares owned when buying", () => {
    const { result } = renderHook(() => {
      return { ...useUserData(), ...usePaperTransaction(mockPaper) };
    });

    act(() => {
      result.current.buyPaper(10);
    });

    expect(result.current.userPapers[0].qtdeAtivo).toBe(30);
  });

  it("should increase the shares available when selling", () => {
    const { result } = renderHook(() => {
      return { ...useUserData(), ...usePaperTransaction(mockPaper) };
    });

    act(() => {
      result.current.sellPaper(10);
    });

    expect(result.current.allPapers[0].qtdeAtivo).toBe(80);
  });

  it("should decrease the shares owned when buying", () => {
    const { result } = renderHook(() => {
      return { ...useUserData(), ...usePaperTransaction(mockPaper) };
    });

    act(() => {
      result.current.sellPaper(10);
    });

    expect(result.current.userPapers[0].qtdeAtivo).toBe(10);
  });

  it("should clear the user paper when selling all", () => {
    const { result } = renderHook(() => {
      return { ...useUserData(), ...usePaperTransaction(mockPaper) };
    });

    act(() => {
      result.current.sellPaper(10);
    });

    expect(result.current.userPapers).not.toContain({
      ...mockPaper,
      qtdeAtivo: 0,
    });
  });
});
