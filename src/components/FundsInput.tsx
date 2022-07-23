import { SwitchHorizontalIcon } from "@heroicons/react/solid";
import { incrementFunds } from "api";
import { useUserData } from "hooks";
import React from "react";
import toast from "react-hot-toast";

function useFundsInput() {
  const { funds, setFunds, portfolio } = useUserData();

  const [tab, setTab] = React.useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = React.useState<number | "">(0);

  const confirmTransaction = async () => {
    const by = Number(amount) * (tab === "deposit" ? 1 : -1);

    setAmount(0);

    const { error, data: newFunds } = await incrementFunds(by);

    if (error) {
      toast.error(error.message);
      return;
    }

    setFunds(newFunds ?? funds + by);
  };

  return {
    funds,
    confirmTransaction,
    portfolio,
    amount,
    add50: () => setAmount(Number(amount) + 50),
    setAmount: (e: React.ChangeEvent<HTMLInputElement>) =>
      setAmount(Math.abs(+e.target.value) || ""),
    addAmount: (add: number) => () => setAmount(Number(amount) + add),
    tab,
    toggleTab: () => setTab(tab === "deposit" ? "withdraw" : "deposit"),
  };
}

export default function Funds() {
  const {
    funds,
    amount,
    setAmount,
    addAmount,
    add50,
    confirmTransaction,
    tab,
    toggleTab,
  } = useFundsInput();

  return (
    <>
      <div className="px-2 my-2 flex justify-between items-center">
        <h1 className="px-2 font-medium text-xl">
          {tab === "deposit" ? "Deposit" : "Withdraw"} request
        </h1>

        <button
          data-testid="switch-transaction"
          onClick={toggleTab}
          className="p-2"
        >
          <SwitchHorizontalIcon className="h-5" />
        </button>
      </div>

      <div className="px-4">
        <div className="relative">
          <input
            type="number"
            id="fund-amount"
            className={`${
              tab === "withdraw"
                ? "focus:border-red-600"
                : "focus:border-blue-600"
            } block rounded-t-lg pr-4 pl-16 pb-3 pt-9 w-full text-3xl
            font-semibold bg-slate-200 border-0 border-b-2 border-slate-400
            appearance-none focus:outline-none focus:ring-0
            peer`}
            value={amount}
            onChange={setAmount}
            min="0"
          />

          <label
            htmlFor="fund-amount"
            className="absolute top-3 left-4 text-xs"
          >
            Specify the amount
          </label>

          <span className="absolute left-4 bottom-3.5 text-3xl font-semibold">
            R${" "}
          </span>
        </div>
      </div>

      <div
        className="px-4 py-2 flex gap-2 [&>*]:grow [&>*]:bg-slate-200
        font-medium text-slate-500"
      >
        <button
          onClick={add50}
          className="rounded-lg px-2.5 py-1 text-sm"
          id="add-50"
        >
          +R$ 50
        </button>

        <button
          onClick={addAmount(100)}
          className="rounded-lg px-2.5 py-1 text-sm"
          id="add-100"
        >
          +R$ 100
        </button>

        <button
          onClick={addAmount(500)}
          className="rounded-lg px-2.5 py-1 text-sm"
          id="add-500"
        >
          +R$ 500
        </button>

        <button
          onClick={addAmount(funds)}
          className="rounded-lg px-2.5 py-1 text-sm"
          id="add-fund-amount"
        >
          +Funds
        </button>
      </div>

      <button
        type="button"
        className={`text-white h-12 bg-blue-700 mx-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 focus:outline-none disabled:opacity-25 ${
          tab === "withdraw" && "bg-red-700 hover:bg-red-800 focus:ring-red-300"
        }`}
        disabled={(tab === "withdraw" && amount > funds) || amount == 0}
        id="confirm-transaction"
        onClick={confirmTransaction}
      >
        {tab === "withdraw" ? "WITHDRAW" : "DEPOSIT"}
      </button>
    </>
  );
}
