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
};

const UserContext = React.createContext<UserContextValue>({
  userPapers: [],
  setUserPapers: () => {},
  user: "",
  setUser: () => {},
});

export function UserProvider({ children }: Props) {
  const [userPapers, setUserPapers] = useLocalStorage(
    "userPapers",
    [] as typeof papers
  );
  const [user, setUser] = useLocalStorage("user", "");

  const value = { userPapers, setUserPapers, user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
