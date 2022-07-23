import { Transaction as TTransaction } from "tests/mocks";

type Props = {
  data: TTransaction;
};

export default function Transaction({ data }: Props) {
  const date = new Date(data.data);

  const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  const factor = data.venda ? 1 : -1;

  return (
    <div id={`transaction-${data.id}`}>
      <div>{data.codAtivo} </div>

      <div>x {data.qtdeAtivo} </div>

      <div>{(data.valor * factor).toFixed(2)} </div>

      <div>{dateString} </div>
    </div>
  );
}
