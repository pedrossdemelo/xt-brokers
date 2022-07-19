import { SwitchHorizontalIcon } from "@heroicons/react/solid";
import { Timeline } from "flowbite-react";
import { useUserData } from "hooks";
import React from "react";

function useFunds() {
  const { funds, setFunds, portfolio } = useUserData();

  const [tab, setTab] = React.useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = React.useState(0);

  function addFunds() {
    setFunds(funds + amount);
  }

  function removeFunds() {
    setFunds(funds - amount);
  }

  return {
    funds,
    addFunds,
    removeFunds,
    portfolio,
    amount,
    setAmount: (e: React.ChangeEvent<HTMLInputElement>) =>
      // @ts-ignore
      setAmount(Math.abs(+e.target.value) || ""),
    addAmount: (add: number) => () => setAmount(amount + add),
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
    addFunds,
    removeFunds,
    tab,
    toggleTab,
  } = useFunds();

  return (
    <div className="grow flex flex-col">
      <div className="px-2 my-2 flex justify-between items-center">
        <h1 className="px-2 font-medium text-xl">
          {tab === "deposit" ? "Deposit" : "Withdraw"} request
        </h1>

        <button onClick={toggleTab} className="p-2">
          <SwitchHorizontalIcon className="h-5" />
        </button>
      </div>

      <div className="px-4">
        <div className="relative">
          <input
            type="number"
            id="fund-amount"
            className={`${
              tab === "withdraw" && "focus:border-red-600"
            } block rounded-t-lg pr-4 pl-16 pb-3 pt-9 w-full text-3xl font-semibold bg-slate-200 border-0 border-b-2 border-slate-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
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

      <div className="px-4 py-2 flex gap-2 [&>*]:grow [&>*]:bg-slate-200 font-medium text-slate-500">
        <button
          onClick={addAmount(50)}
          className="rounded-lg px-2.5 py-1 text-sm"
        >
          +R$ 50
        </button>

        <button
          onClick={addAmount(100)}
          className="rounded-lg px-2.5 py-1 text-sm"
        >
          +R$ 100
        </button>

        <button
          onClick={addAmount(500)}
          className="rounded-lg px-2.5 py-1 text-sm"
        >
          +R$ 500
        </button>

        <button
          onClick={addAmount(funds)}
          className="rounded-lg px-2.5 py-1 text-sm"
        >
          +Funds
        </button>
      </div>

      <button
        type="button"
        className={`text-white h-12 bg-blue-700 mx-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 focus:outline-none disabled:opacity-25 ${
          tab === "withdraw" && "bg-red-700 hover:bg-red-800 focus:ring-red-300"
        } `}
        disabled={(tab === "withdraw" && amount > funds) || amount == 0}
        onClick={() => {
          const transaction = tab === "withdraw" ? removeFunds : addFunds;
          transaction();
        }}
      >
        {tab === "withdraw" ? "WITHDRAW" : "DEPOSIT"}
      </button>

      <div className="p-4">
        <h3 className="font-medium text-xl mb-4">Announcements</h3>

        <Timeline>
          <Timeline.Item>
            <Timeline.Point />

            <Timeline.Content>
              <Timeline.Time>18 July 2022</Timeline.Time>

              <Timeline.Title>Deposits are now free!</Timeline.Title>

              <Timeline.Body>
                <p className="text-sm">
                  The manager has gone crazy! We are now accepting deposits
                  without fees, and... without any payments! That&apos;s right,
                  we are giving free fake virtual money!
                </p>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>

          <Timeline.Item>
            <Timeline.Point />

            <Timeline.Content>
              <Timeline.Time>9 July 2022</Timeline.Time>

              <Timeline.Title>XP Inc. is hiring!</Timeline.Title>

              <Timeline.Body>
                <p className="text-sm">
                  Brazil&apos;s leading financial services company is opening up
                  100 positions tailored towards early-career software
                  engineers. Let&apos;s hope they notice me!
                </p>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  );
}
