/* eslint-disable prettier/prettier */
import { UserContextValue } from "context";
import React from "react";
import {
  fetchAllPapers,
  fetchFunds,
  fetchTransactions,
  fetchUserPapers,
} from "utils";

export default function useFetchData(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setTransactions: UserContextValue["setTransactions"],
  setUserPapers: UserContextValue["setUserPapers"],
  setAllPapers: UserContextValue["setAllPapers"],
  setFunds: UserContextValue["setFunds"],
) {
  React.useEffect(() => {
    (async () => {
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
  }, []);
}
