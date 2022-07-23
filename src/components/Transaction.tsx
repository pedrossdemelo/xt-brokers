import { GlobeAltIcon } from "@heroicons/react/solid";
import { Transaction as TTransaction } from "tests/mocks";

type Props = {
  data: TTransaction;
};

export default function Transaction({ data }: Props) {
  const date = new Date(data.data);

  const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  const factor = data.venda ? 1 : -1;

  return (
    <div
      className="rounded-xl flex gap-3 text-sm border border-gray-200 p-3"
      id={`transaction-${data.id}`}
    >
      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
        <GlobeAltIcon className="h-6 opacity-30" />
      </div>

      <div className="font-semibold">
        {data.venda ? "Sold " : "Bought "}

        {`${data.qtdeAtivo} `}

        {data.codAtivo}

        <br />

        <span
          className={`font-medium ${
            data.venda ? "text-green-700" : "text-red-700"
          }`}
        >
          R$ {(data.valor * factor).toFixed(2)}
        </span>
      </div>

      <div className="text-right text-xs self-end grow">{dateString} </div>
    </div>
  );
}
