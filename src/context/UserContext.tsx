/* eslint-disable prettier/prettier */
import { User } from "@supabase/supabase-js";
import { useLocalStorage } from "hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Transaction } from "tests/mocks";
import { UserContextValue } from "types";
import {
  fetchAllPapers,
  fetchFunds,
  fetchTransactions,
  fetchUserPapers,
  supabase,
} from "utils";

const UserContext = React.createContext<UserContextValue | null>(null);

const lastEmail = localStorage.getItem("lastEmail");
const loggedAt = localStorage.getItem("loggedAt");

interface Props {
  children: React.ReactNode;
}

export function UserProvider({ children }: Props) {
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [userPapers, setUserPapers] = React.useState<Paper[]>([]);
  const [allPapers, setAllPapers] = React.useState<Paper[]>([]);
  const [user, setUser] = React.useState<null | User>(supabase.auth.user());
  const [funds, setFunds] = React.useState(0);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  const portfolio = React.useMemo(
    () =>
      userPapers.reduce((acc, paper) => {
        return acc + paper.valor * paper.qtdeAtivo;
      }, 0),
    [userPapers],
  );
  const [hideMoney, setHideMoney] = useLocalStorage("hideMoney", false);

  React.useEffect(() => {
    (async () => {
      if (!user) return setLoading(false);

      setLoading(true);

      const { data: userPapers, error: errorUP } = await fetchUserPapers();
      const { data: allPapers, error: errorAP } = await fetchAllPapers();
      const { data: transactions, error: errorT } = await fetchTransactions();
      const { data: saldo, error: errorF } = await fetchFunds();

      if (errorUP || errorAP || errorT || errorF) {
        // TODO: inform user with error toast
        return console.error(errorUP);
      }

      setTransactions(transactions ?? []);
      setUserPapers(userPapers ?? []);
      setAllPapers(allPapers ?? []);
      setFunds(saldo?.[0]?.saldo ?? 0);

      setLoading(false);
    })();
  }, [user]);

  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        switch (event) {
        case "SIGNED_IN":
          setUser(session!.user);
          localStorage.setItem("lastEmail", session!.user?.email!);
          localStorage.setItem("loggedAt", new Date().toISOString());
          navigate("/", { replace: true });
          break;
        case "SIGNED_OUT":
          setUser(null);
          navigate("/login", { replace: true });
          break;
        case "USER_DELETED":
          setUser(null);
          navigate("/login", { replace: true });
          break;
        }
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  // Supabase realtime subscriptions are down
  // just after I spent hours setting them up
  // @see https://github.com/supabase/supabase-js/issues/443
  // @see https://github.com/supabase/supabase/issues/7771

  // R.I.P 😭😭😭😭😭😭😭😭😭
  // useRealtime(setTransactions, setUserPapers, setAllPapers, setFunds);

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
    logout: () => supabase.auth.signOut(),
    hideMoney,
    setHideMoney,
    loggedIn: !!user,
    loading,
    setLoading,
    transactions,
    setTransactions,
    lastEmail,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
