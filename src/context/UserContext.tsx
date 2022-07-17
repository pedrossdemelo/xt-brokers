import useLocalStorage from "hooks/useLocalStorage";
import React, { useRef } from "react";
import { Paper, papers } from "utils/mockData";

type Props = {
  children: React.ReactNode;
};

type UserContextValue = {
  userPapers: typeof papers;
  setUserPapers: React.Dispatch<React.SetStateAction<typeof papers>>;
  allPapers: typeof papers;
  setAllPapers: React.Dispatch<React.SetStateAction<typeof papers>>;
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  funds: number;
  setFunds: React.Dispatch<React.SetStateAction<number>>;
  loggedAt: Date;
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
  loggedAt: new Date(),
});

export function UserProvider({ children }: Props) {
  const [userPapers, setUserPapers] = useLocalStorage(
    "userPapers",
    [] as Paper[]
  );

  const [allPapers, setAllPapers] = useLocalStorage("allPapers", papers);

  const [user, setUser] = useLocalStorage("user", "");

  const [funds, setFunds] = useLocalStorage("funds", 1000);

  const loggedAt = useRef(new Date());

  const value = {
    userPapers,
    setUserPapers,
    allPapers,
    setAllPapers,
    user,
    setUser,
    funds,
    setFunds,
    loggedAt: loggedAt.current,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
