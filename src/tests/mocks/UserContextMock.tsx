import { User } from "@supabase/supabase-js";
import { UserContext } from "context";
import { useLocalStorage } from "hooks";
import React from "react";
import { UserContextValue } from "types";
import { papers } from "./mockPapers";
import { transactions as transactionsMock } from "./mockTransactions";

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

type UserMockContextValue = {
  mockContext?: MockContext;
  user: Partial<User>;
} & Omit<UserContextValue, "user">;

export function UserProviderMock({ children, mockContext }: Props) {
  const [transactions, setTransactions] = React.useState(
    mockContext?.transactions ?? transactionsMock,
  );
  const [userPapers, setUserPapers] = useLocalStorage(
    "userPapers",
    mockContext?.userPapers ?? [],
  );
  const [allPapers, setAllPapers] = useLocalStorage(
    "allPapers",
    mockContext?.allPapers ?? papers,
  );
  const [user, setUser] = useLocalStorage<Partial<User> | null>(
    "user",
    mockContext?.user ?? ({ email: "test@test.com" } as Partial<User>),
  );
  const [funds, setFunds] = useLocalStorage(
    "funds",
    mockContext?.funds ?? 10000,
  );
  const [loggedIn, setLoggedIn] = React.useState(mockContext?.loggedIn ?? true);

  const logout = () => {
    setUser(null);
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
    loading: false,
    transactions,
    setTransactions,
    lastEmail: mockContext?.lastEmail ?? null,
    ...mockContext,
  };

  // @ts-expect-error: mockContext is not a valid context value
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
