import { TrendingUpIcon } from "@heroicons/react/solid";
import { Modal, TextInput } from "flowbite-react";
import { usePaperTransaction, useUserData } from "hooks";
import React, { useCallback, useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

function useTrade() {
  const { ticker } = useParams();
  const { userPapers, allPapers, funds } = useUserData();
  const [buyAmount, setBuyAmount] = React.useState(0);
  const [sellAmount, setSellAmount] = React.useState(0);

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
    buyAmount,
    setBuyAmount: (e: React.ChangeEvent<HTMLInputElement>) =>
      setBuyAmount(Math.max(0, +e.target.value)),
    sellAmount,
    setSellAmount: (e: React.ChangeEvent<HTMLInputElement>) =>
      setSellAmount(Math.max(0, +e.target.value)),
    userPaper: userPaper ?? defaultPaper,
    poolPaper: poolPaper ?? defaultPaper,
    funds,
    ticker,
    sellPaper,
    buyPaper,
    goBack,
    notFound,
    tab,
    setTab,
  };
}

export default function Trade() {
  const {
    buyAmount,
    setBuyAmount,
    sellAmount,
    setSellAmount,
    userPaper,
    poolPaper,
    ticker,
    funds,
    buyPaper,
    goBack,
    notFound,
  } = useTrade();

  if (notFound) return <Navigate to="/" />;

  return (
    <Modal show position="center" size="lg" onClose={goBack}>
      <Modal.Header>
        <div className="-my-2 flex items-center justify-between gap-6">
          <div>
            <h1>{ticker}</h1>

            <p className="text-sm -mt-1 text-gray-400">{poolPaper.NomeAtivo}</p>
          </div>

          <div className="flex items-center">
            <TrendingUpIcon className="h-6" />
          </div>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="space-y-6">
          <TextInput
            type="number"
            addon="Buy"
            value={buyAmount}
            onChange={setBuyAmount}
            helperText={
              "Funds after: " + (funds - poolPaper.Valor * buyAmount).toFixed(2)
            }
          />

          <TextInput
            type="number"
            addon="Sell"
            value={sellAmount}
            onChange={setSellAmount}
            helperText={
              "Funds after: " +
              (funds + poolPaper.Valor * sellAmount).toFixed(2)
            }
          />
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button
          type="button"
          disabled={
            userPaper.QteAtivo < buyAmount ||
            buyAmount <= 0 ||
            funds < buyAmount * poolPaper.Valor
          }
          className="text-white h-12 w-full bg-blue-700 hover:bg-blue-800
          focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5
          py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700
          focus:outline-none dark:focus:ring-blue-800 disabled:opacity-25"
          onClick={() => {
            buyPaper(buyAmount);
            goBack();
          }}
        >
          BUY
        </button>
      </Modal.Footer>
    </Modal>
  );
}
