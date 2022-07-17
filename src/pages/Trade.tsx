import { Button, Modal, TextInput } from "flowbite-react";
import usePaperTransaction from "hooks/usePaperTransaction";
import useUserData from "hooks/useUserData";
import React, { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Paper } from "utils/mockData";

type Props = {};

function useTrade() {
  const { ticker } = useParams();
  const { userPapers, allPapers, funds } = useUserData();
  const [buyAmount, setBuyAmount] = React.useState(0);
  const [sellAmount, setSellAmount] = React.useState(0);

  const userPaper = useMemo(
    () => userPapers.find(paper => paper.CodAtivo === ticker),
    [userPapers]
  );

  const poolPaper = useMemo(
    () => allPapers.find(paper => paper.CodAtivo === ticker),
    [allPapers]
  );

  const defaultPaper = { ...userPaper!, ...poolPaper!, QteAtivo: 0 };

  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate("/dashboard");
  }, []);

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
  };
}

export default function Trade({}: Props) {
  const {
    buyAmount,
    setBuyAmount,
    sellAmount,
    setSellAmount,
    userPaper,
    poolPaper,
    ticker,
    funds,
    sellPaper,
    buyPaper,
    goBack,
  } = useTrade();

  return (
    <Modal show position="center" onClose={goBack}>
      <Modal.Header>Trade {ticker}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p>
            In portfolio: {userPaper.QteAtivo} | In pool: {poolPaper.QteAtivo} |
            Funds: {funds.toFixed(2)} | Price: {poolPaper.Valor}
          </p>
          <TextInput
            type="number"
            addon="Buy"
            value={buyAmount}
            onChange={setBuyAmount}
            helperText={"Funds after: " + (funds - poolPaper.Valor * buyAmount).toFixed(2)}
          />
          <TextInput
            type="number"
            addon="Sell"
            value={sellAmount}
            onChange={setSellAmount}
            helperText={"Funds after: " + (funds + poolPaper.Valor * sellAmount).toFixed(2)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={poolPaper.QteAtivo < buyAmount || buyAmount <= 0 || funds < buyAmount * poolPaper.Valor}
          onClick={() => {
            buyPaper(buyAmount);
            goBack();
          }}
        >
          Buy
        </Button>
        <Button
          disabled={userPaper.QteAtivo < sellAmount || sellAmount <= 0}
          onClick={() => {
            sellPaper(sellAmount);
            goBack();
          }}
        >
          Sell
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
