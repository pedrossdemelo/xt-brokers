import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import { Modal } from "flowbite-react";
import { usePaperTransaction, useUserData } from "hooks";
import React, { useCallback, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function useTrade() {
  const { ticker } = useParams();
  const { userPapers, allPapers, funds } = useUserData();
  const [amount, setAmount] = React.useState(0);

  const [tab, setTab] = React.useState("buy");

  const userPaper = useMemo(
    () => userPapers.find((paper) => paper.CodAtivo === ticker),
    [userPapers],
  );

  const poolPaper = useMemo(
    () => allPapers.find((paper) => paper.CodAtivo === ticker),
    [allPapers],
  );

  const defaultPaper = { ...userPaper!, ...poolPaper!, QteAtivo: 0 };

  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate("/");
  }, []);

  const notFound = useMemo(
    () => !userPaper && !poolPaper,
    [userPaper, poolPaper],
  );

  const { buyPaper, sellPaper } = usePaperTransaction(defaultPaper);

  return {
    amount,
    setAmount: (e: React.ChangeEvent<HTMLInputElement>) =>
      setAmount(Math.max(0, +e.target.value)),
    userPaper: userPaper ?? defaultPaper,
    poolPaper: poolPaper ?? defaultPaper,
    funds,
    ticker,
    sellPaper,
    buyPaper,
    goBack,
    notFound,
    tab,
    incAmount: () => setAmount(amount + 1),
    decAmount: () => setAmount(amount - 1),
    setBuy: () => setTab("buy"),
    setSell: () => setTab("sell"),
  };
}

export default function Trade() {
  const {
    amount,
    setAmount,
    userPaper,
    poolPaper,
    ticker,
    funds,
    buyPaper,
    sellPaper,
    goBack,
    notFound,
    incAmount,
    decAmount,
    tab,
    setBuy,
    setSell,
  } = useTrade();

  if (notFound) return <Navigate to="/" />;

  const name = poolPaper.NomeAtivo;
  const price = poolPaper.Valor;
  const amountAvailable = poolPaper.QteAtivo;
  const userAmount = userPaper.QteAtivo;

  return (
    <Modal show position="center" size="lg" onClose={goBack}>
      <Modal.Header>
        <div className="-my-2 flex items-center justify-between gap-6">
          <div>
            <h1>{ticker}</h1>

            <p className="text-sm -mt-1 text-gray-400">{name}</p>
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="flex flex-col gap-4 -mt-2">
          <div className="flex flex-col rounded-md border-gray-200 border overflow-hidden">
            <div
              className="flex gap-2 items-center justify-between border-b
            border-gray-200 h-10"
            >
              <div className="flex items-stretch h-full">
                <button
                  onClick={setBuy}
                  disabled={funds < price}
                  className={`border-r border-gray-200 px-4 disabled:text-gray-300 disabled:pointer-events-none ${
                    tab === "buy" && "font-semibold bg-blue-50/50 text-blue-700"
                  }`}
                >
                  BUY
                </button>

                <button
                  onClick={setSell}
                  disabled={userAmount === 0}
                  className={`border-r border-gray-200 px-4 disabled:text-gray-300 disabled:pointer-events-none ${
                    tab === "sell" && "font-semibold bg-red-50/50 text-red-700"
                  }`}
                >
                  SELL
                </button>
              </div>

              <span className="font-medium pr-4">
                {price}

                {" · "}

                <span
                  className={`${
                    poolPaper.Variacao > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {poolPaper.Variacao}%
                </span>
              </span>
            </div>

            <div className="relative flex text-center flex-col bg-gray-100">
              <div
                className="text-xs absolute left-1/2 top-1.5 -translate-x-1/2
              text-gray-600 font-medium"
              >
                AMOUNT
              </div>

              <button
                onClick={decAmount}
                disabled={amount === 0}
                className="absolute top-1/2 disabled:opacity-20 opacity-60 p-2 -translate-y-1/2 left-2"
              >
                <MinusSmIcon className="h-6" />
              </button>

              <button
                onClick={incAmount}
                disabled={amount === amountAvailable}
                className="absolute top-1/2 disabled:opacity-20 opacity-60 p-2 -translate-y-1/2 right-2"
              >
                <PlusSmIcon className="h-6" />
              </button>

              <input
                type="number"
                value={amount}
                onChange={setAmount}
                className="bg-transparent focus:ring-gray-200 focus:ring-2 border-none
                text-center font-medium h-16 pt-6 text-3xl"
              />
            </div>

            <div className="grid py-2 px-4 text-gray-600 border-t border-gray-200 grid-cols-2 grid-flow-row gap-x-6 gap-y-2 text-xs">
              <span>
                {"Funds: "}

                <span className="float-right">R$ {funds.toFixed(2)}</span>
              </span>

              <span
                className={`${
                  tab === "buy" && amount * price > funds && "text-red-700"
                }`}
              >
                {"Order: "}

                <span className="float-right">
                  R$ {(price * amount).toFixed(2)}
                </span>
              </span>

              <span className="col-span-2 -mx-4 bg-gray-200 border-b"></span>

              <span
                className={`${
                  tab === "buy" && amountAvailable < amount && "text-red-700"
                }`}
              >
                {"Available: "}

                <span className="float-right">{amountAvailable} shares</span>
              </span>

              <span
                className={`${
                  tab === "sell" && amount > userAmount && "text-red-700"
                }`}
              >
                {"Position: "}

                <span className="float-right">{userAmount} shares</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            className={`text-white h-12 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 focus:outline-none disabled:opacity-25 ${
              tab === "sell" && "bg-red-700 hover:bg-red-800 focus:ring-red-300"
            } `}
            disabled={
              (tab === "sell" && amount > userAmount) ||
              (tab === "buy" && amount * price > funds)
            }
            onClick={() => {
              const transaction = tab === "sell" ? sellPaper : buyPaper;
              transaction(amount);
              goBack();
            }}
          >
            {tab === "sell" ? "SELL" : "BUY"}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
