import useLocalStorage from "hooks/useLocalStorage";
import React from "react";
import { papers } from "utils/mockData";

type Props = {
  children: React.ReactNode;
};

type UserContextValue = {
  userPapers: typeof papers;
  setUserPapers: (paper: typeof papers) => void;
  user: string;
  setUser: (user: string) => void;
  loggedAt: Date;
};

const UserContext = React.createContext<UserContextValue>({
  userPapers: [],
  setUserPapers: () => {},
  user: "",
  setUser: () => {},
  loggedAt: new Date(),
});

export function UserProvider({ children }: Props) {
  const [userPapers, setUserPapers] = useLocalStorage(
    "userPapers",
    [] as typeof papers
  );
  const [user, setUser] = useLocalStorage("user", "");

  const value = {
    userPapers,
    setUserPapers,
    user,
    setUser,
    loggedAt: new Date(),
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
