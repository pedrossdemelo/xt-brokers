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
      <h1 className="text-xl font-medium mx-4 mt-4 mb-2 md:mx-6">
        Transactions
      </h1>

      <div className="grid gap-4 px-4 md:grid-cols-2 xl:grid-cols-3">
        {transactions.map((transaction) => (
          <Transaction data={transaction} key={transaction.id} />
        ))}
      </div>
    </div>
  );
}
