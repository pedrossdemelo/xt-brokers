import { useLocalStorage } from "hooks";
import React from "react";
import { Paper, papers } from "tests/mocks";

type Props = {
  children: React.ReactNode;
};

export type UserContextValue = {
  userPapers: typeof papers;
  setUserPapers: React.Dispatch<React.SetStateAction<typeof papers>>;
  allPapers: typeof papers;
  setAllPapers: React.Dispatch<React.SetStateAction<typeof papers>>;
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  funds: number;
  setFunds: React.Dispatch<React.SetStateAction<number>>;
  portfolio: number;
  loggedAt: string | null;
  logout: () => void;
  hideMoney: boolean;
  setHideMoney: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserContext = React.createContext<UserContextValue>({
  userPapers: [],
  setUserPapers: () => {},
  allPapers: [],
  setAllPapers: () => {},
  user: "",
  setUser: () => {},
  funds: 1000,
  setFunds: () => {},
  portfolio: 0,
  loggedAt: null,
  logout: () => {},
  hideMoney: false,
  setHideMoney: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
});

const loggedAt = localStorage.getItem("loggedAt");
const minutes = (min: number) => min * 60 * 1000;

export function UserProvider({ children }: Props) {
  const [userPapers, setUserPapers] = useLocalStorage(
    "userPapers",
    [] as Paper[],
  );
  const [allPapers, setAllPapers] = useLocalStorage("allPapers", papers);
  const [user, setUser] = useLocalStorage("user", "");
  const [funds, setFunds] = useLocalStorage("funds", 1000);

  // only allow loggedIn to be true if user is set and
  // the time difference between now and the last login is less than 10 minutes
  const [loggedIn, setLoggedIn] = React.useState(
    Boolean(
      user &&
        loggedAt &&
        new Date().getTime() - new Date(loggedAt).getTime() < minutes(10),
    ),
  );

  const logout = () => {
    setUser("");
    setUserPapers([]);
    setFunds(1000);
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
  const [hideMoney, setHideMoney] = useLocalStorage("hideMoney", false);

  React.useEffect(() => {
    if (loggedIn) localStorage.setItem("loggedAt", new Date().toISOString());
  }, [loggedIn]);

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
    loggedAt,
    logout,
    hideMoney,
    setHideMoney,
    loggedIn,
    setLoggedIn,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
