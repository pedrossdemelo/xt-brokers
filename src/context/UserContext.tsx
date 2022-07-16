import useLocalStorage from "hooks/useLocalStorage";
import React from "react";
import { papers } from "utils/MockData";

type Props = {
  children: React.ReactNode;
};

type ContextValue = {
  papers: typeof papers;
  setPapers: (paper: typeof papers) => void;
  user: string;
  setUser: (user: string) => void;
};

const UserContext = React.createContext<ContextValue>({
  papers: [],
  setPapers: () => {},
  user: "",
  setUser: () => {},
});

export function UserProvider({ children }: Props) {
  const [paperPool, setPapers] = useLocalStorage("paperPool", papers);
  const [user, setUser] = useLocalStorage("user", "");

  const value = {
    papers: paperPool,
    setPapers,
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
