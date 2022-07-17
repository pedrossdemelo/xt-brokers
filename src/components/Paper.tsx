import { Button } from "flowbite-react";
import usePaperTransaction from "hooks/usePaperTransaction";
import { Paper as TPaper } from "utils/mockData";

type Props = {
  data: TPaper;
  personal?: boolean;
};

function usePaper(paper: TPaper) {
  const transactions = usePaperTransaction(paper);
  return transactions;
}

export default function Paper({ data, personal }: Props) {
  const { sellPaper, buyPaper } = usePaper(data);

  return (
    <div>
      <div>
        {data.CodAtivo} {data.Valor} {data.QteAtivo}
      </div>
      <Button onClick={() => buyPaper(1)}>Buy</Button>
      {personal && <Button onClick={() => sellPaper(1)}>Sell</Button>}
    </div>
  );
}
