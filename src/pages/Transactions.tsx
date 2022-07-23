import { Transaction } from "components";
import { useUserData } from "hooks";

function useTransactions() {
  const { transactions } = useUserData();

  return { transactions };
}

export default function Transactions() {
  const { transactions } = useTransactions();

  return (
    <div className="grow">
      {transactions.map((transaction) => (
        <Transaction data={transaction} key={transaction.id} />
      ))}
    </div>
  );
}
