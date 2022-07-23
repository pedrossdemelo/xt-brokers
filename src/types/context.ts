import { User } from "@supabase/supabase-js";
import React from "react";
import { Paper, Transaction } from "tests/mocks";

export interface UserContextValue {
  userPapers: Paper[];
  setUserPapers: React.Dispatch<React.SetStateAction<Paper[]>>;
  allPapers: Paper[];
  setAllPapers: React.Dispatch<React.SetStateAction<Paper[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<null | User>>;
  funds: number;
  setFunds: React.Dispatch<React.SetStateAction<number>>;
  portfolio: number;
  loggedAt: string | null;
  logout: () => void;
  hideMoney: boolean;
  setHideMoney: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  lastEmail: null | string;
}
