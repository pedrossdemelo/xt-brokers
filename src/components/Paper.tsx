import {
  GlobeAltIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "@heroicons/react/solid";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Paper as TPaper } from "utils";

type Props = {
  data: TPaper;
  personal?: boolean;
};

function usePaper(paper: TPaper) {
  const navigate = useNavigate();

  const tradeTicker = useCallback(() => {
    navigate(`trade/${paper.CodAtivo}`);
  }, [paper]);

  return { tradeTicker };
}

export default function Paper({ data, personal = false }: Props) {
  const { tradeTicker } = usePaper(data);

  return (
    <div
      onClick={tradeTicker}
      className="border-gray-200 p-3 rounded-xl text-sm border flex justify-between items-center"
    >
      <div className="flex gap-3 items-center">
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <GlobeAltIcon className="h-6 opacity-30" />
        </div>

        <div>
          <div className="font-semibold">
            <span>{data.CodAtivo}</span>

            <span
              className={`text-[11px] h-full relative inline-block bottom-px ml-1 ${
                data.Variacao > 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {data.Variacao > 0 ? (
                <TrendingUpIcon className="h-4 mr-1 inline" />
              ) : (
                <TrendingDownIcon className="h-4 mr-1 inline" />
              )}

              {data.Variacao}

              {"%"}
            </span>
          </div>

          <div className="text-xs">{data.NomeAtivo}</div>
        </div>
      </div>

      <div className="text-right">
        <div
          className={`font-semibold ${
            data.Variacao > 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          <span>
            R$ {personal ? (data.Valor * data.QteAtivo).toFixed(2) : data.Valor}
          </span>
        </div>

        <div className="text-xs">
          {data.QteAtivo}

          {personal ? " owned" : " available"}
        </div>
      </div>
    </div>
  );
}
