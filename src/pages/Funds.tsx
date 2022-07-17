import { Button, TextInput } from "flowbite-react";
import { useUserData } from "hooks";
import React from "react";

type Props = {};

function useFunds() {
  const { funds, setFunds, userPapers, logout } = useUserData();

  const [amount, setAmount] = React.useState(0);

  const portfolio = React.useMemo(
    () =>
      userPapers.reduce((acc, paper) => {
        return acc + paper.Valor * paper.QteAtivo;
      }, 0),
    [userPapers]
  );

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
      setAmount(Math.max(0, +e.target.value)),
    logout,
  };
}

export default function Funds({}: Props) {
  const { funds, amount, setAmount, addFunds, removeFunds, portfolio, logout } =
    useFunds();

  return (
    <>
      <div>Funds: {funds.toFixed(2)}</div>
      <div>Portfolio: {portfolio.toFixed(2)}</div>

      <TextInput type="number" value={amount} onChange={setAmount} />

      <Button onClick={addFunds}>Add Funds</Button>
      <Button onClick={removeFunds} disabled={funds < amount}>Remove Funds</Button>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}
