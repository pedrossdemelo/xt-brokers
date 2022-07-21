import { useUserData } from "hooks";
import { renderHook } from "tests";
import { papers } from "tests/mocks";

const contextMock = {
  user: "test@test.com",
  userPapers: [],
  allPapers: papers.slice(0, 10),
  portfolio: 1000,
  funds: 1000,
  loggedAt: new Date().toISOString(),
  hideMoney: false,
  loggedIn: true,
};

describe("useUserData", () => {
  it("should return the values inside of UserDataContext", () => {
    const { result } = renderHook(() => useUserData(), {
      mock: contextMock,
    });

    const context = result.current;

    for (const [key, value] of Object.entries(context)) {
      if (typeof value === "function") continue;
      // @ts-ignore
      expect(value).toStrictEqual(contextMock?.[key]);
    }
  });
});
