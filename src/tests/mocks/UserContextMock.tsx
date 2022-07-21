import { UserContext, UserContextValue } from "context";
import { useLocalStorage } from "hooks";
import React from "react";
import { papers } from "./mockPapers";

type ExcludeValuesOfType<U, T> = {
  [K in keyof T]: T[K] extends U ? never : T[K];
};

export type MockContext = Partial<
  ExcludeValuesOfType<Function, UserMockContextValue>
>;

type Props = {
  children: React.ReactNode;
  mockContext?: MockContext;
};

type UserMockContextValue = UserContextValue & {
  mockContext?: MockContext;
};

export function UserProviderMock({ children, mockContext }: Props) {
  const [userPapers, setUserPapers] = useLocalStorage(
    "userPapers",
    mockContext?.userPapers ?? [],
  );
  const [allPapers, setAllPapers] = useLocalStorage(
    "allPapers",
    mockContext?.allPapers ?? papers,
  );
  const [user, setUser] = useLocalStorage(
    "user",
    mockContext?.user ?? "test@gmail.com",
  );
  const [funds, setFunds] = useLocalStorage(
    "funds",
    mockContext?.funds ?? 10000,
  );
  const [loggedIn, setLoggedIn] = React.useState(mockContext?.loggedIn ?? true);

  const logout = () => {
    setUser("");
    setUserPapers([]);
    setFunds(mockContext?.funds ?? 10000);
    setAllPapers(papers);
    setLoggedIn(false);
  };

  const portfolio = React.useMemo(
    () =>
      userPapers.reduce((acc, paper) => {
        return acc + paper.valor * paper.qtdeAtivo;
      }, 0),
    [userPapers],
  );
  const [hideMoney, setHideMoney] = useLocalStorage(
    "hideMoney",
    mockContext?.hideMoney ?? false,
  );

  const value = {
    userPapers,
    setUserPapers,
    allPapers,
    setAllPapers,
    user,
    setUser,
    funds,
    setFunds,
    portfolio,
    loggedAt: mockContext?.loggedAt ?? null,
    logout,
    hideMoney,
    setHideMoney,
    loggedIn,
    setLoggedIn,
    ...mockContext,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
