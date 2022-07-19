import {
  GlobeAltIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "@heroicons/react/solid";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "utils";

type Props = {
  data: Paper;
};

function usePaper(paper: Paper) {
  const navigate = useNavigate();

  const tradeTicker = useCallback(() => {
    navigate(`trade/${paper.CodAtivo}`);
  }, [paper]);

  return { tradeTicker };
}

export default function CarouselPaper({ data }: Props) {
  const { tradeTicker } = usePaper(data);

  return (
    <button
      onClick={tradeTicker}
      className="border-gray-200 p-3 rounded-xl text-sm border shrink-0 w-52
      text-left flex flex-col items-stretch justify-between"
    >
      <div className="flex gap-3 items-center overflow-hidden">
        <div
          className="h-10 w-10 rounded-full shrink-0 bg-gray-200 flex
          items-center justify-center"
        >
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

          <div className="text-xs line-clamp-1">{data.NomeAtivo}</div>
        </div>
      </div>

      <div className="mt-3">
        <div
          className={`font-semibold text-xl ${
            data.Variacao > 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          <span>R$ {data.Valor}</span>
        </div>

        <div className="text-xs">
          <span>R$ {(data.QteAtivo * data.Valor).toFixed(2)}</span>

          <span className="float-right">{data.QteAtivo} shares</span>
        </div>
      </div>
    </button>
  );
}
