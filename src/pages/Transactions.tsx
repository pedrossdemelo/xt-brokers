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
      <h1 className="text-xl font-medium mx-4 my-4">Transactions</h1>

      <div className="flex flex-col gap-4 mx-4">
        {transactions.map((transaction) => (
          <Transaction data={transaction} key={transaction.id} />
        ))}
      </div>
    </div>
  );
}
