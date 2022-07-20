import { UserContext } from "context";
import { useLocalStorage } from "hooks";
import React, { useRef } from "react";
import { Paper, papers } from "./mockPapers";

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
  userPapers: typeof papers;
  setUserPapers: React.Dispatch<React.SetStateAction<typeof papers>>;
  allPapers: typeof papers;
  setAllPapers: React.Dispatch<React.SetStateAction<typeof papers>>;
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  funds: number;
  setFunds: React.Dispatch<React.SetStateAction<number>>;
  portfolio: number;
  loggedAt: Date;
  logout: () => void;
  hideMoney: boolean;
  setHideMoney: React.Dispatch<React.SetStateAction<boolean>>;
  mockContext?: MockContext;
};

export function UserProviderMock({ children, mockContext }: Props) {
  const [userPapers, setUserPapers] = useLocalStorage(
    "userPapers",
    [] as Paper[],
  );
  const [allPapers, setAllPapers] = useLocalStorage("allPapers", papers);
  const [user, setUser] = useLocalStorage("user", "test@gmail.com");
  const [funds, setFunds] = useLocalStorage("funds", 10000);
  const loggedAt = useRef(new Date());
  const logout = () => {
    setUser("");
    setUserPapers([]);
    setFunds(10000);
    setAllPapers(papers);
    loggedAt.current = new Date();
  };
  const portfolio = React.useMemo(
    () =>
      userPapers.reduce((acc, paper) => {
        return acc + paper.Valor * paper.QteAtivo;
      }, 0),
    [userPapers],
  );
  const [hideMoney, setHideMoney] = useLocalStorage("hideMoney", false);

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
    loggedAt: loggedAt.current,
    logout,
    hideMoney,
    setHideMoney,
    ...mockContext,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
