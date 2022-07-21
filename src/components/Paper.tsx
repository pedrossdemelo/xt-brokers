import {
  GlobeAltIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "@heroicons/react/solid";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Paper as TPaper } from "tests/mocks";

type Props = {
  data: TPaper;
  personal?: boolean;
};

function usePaper(paper: TPaper) {
  const navigate = useNavigate();

  const tradeTicker = useCallback(() => {
    navigate(`trade/${paper.codAtivo}`);
  }, [paper]);

  return { tradeTicker };
}

export default function Paper({ data, personal = false }: Props) {
  const { tradeTicker } = usePaper(data);

  return (
    <button
      onClick={tradeTicker}
      id={`${personal ? "portfolio" : "trade"}-${data.codAtivo}`}
      className="border-gray-200 p-3 rounded-xl text-sm border flex justify-between items-center"
    >
      <div className="flex gap-3 items-center text-left">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <GlobeAltIcon className="h-6 opacity-30" />
        </div>

        <div>
          <div className="font-semibold">
            <span>{data.codAtivo}</span>

            <span
              className={`text-[11px] h-full relative inline-block bottom-px ml-1 ${
                data.variacao > 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {data.variacao > 0 ? (
                <TrendingUpIcon className="h-4 mr-1 inline" />
              ) : (
                <TrendingDownIcon className="h-4 mr-1 inline" />
              )}

              {data.variacao}

              {"%"}
            </span>
          </div>

          <div className="text-xs">{data.nomeAtivo}</div>
        </div>
      </div>

      <div className="text-right">
        <div
          className={`font-semibold ${
            data.variacao > 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          <span>
            R${" "}
            {personal ? (data.valor * data.qtdeAtivo).toFixed(2) : data.valor}
          </span>
        </div>

        <div className="text-xs">
          {data.qtdeAtivo}

          {personal ? " owned" : " available"}
        </div>
      </div>
    </button>
  );
}
