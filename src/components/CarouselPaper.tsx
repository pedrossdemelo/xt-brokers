import {
  GlobeAltIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "@heroicons/react/solid";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "tests/mocks";

type Props = {
  data: Paper;
};

function usePaper(paper: Paper) {
  const navigate = useNavigate();

  const tradeTicker = useCallback(() => {
    navigate(`trade/${paper.codAtivo}`);
  }, [paper]);

  return { tradeTicker };
}

export default function CarouselPaper({ data }: Props) {
  const { tradeTicker } = usePaper(data);

  return (
    <motion.button
      onClick={tradeTicker}
      id={`carousel-${data.codAtivo}`}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0.25, scale: 0.95 }}
      transition={{ duration: 0.75 }}
      className="border-gray-200 hover:bg-white hover:shadow-md p-3 rounded-xl text-sm border shrink-0 w-52
      text-left flex flex-col items-stretch justify-between transition overflow-visible"
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

          <div className="text-xs line-clamp-1">{data.nomeAtivo}</div>
        </div>
      </div>

      <div className="mt-3">
        <div
          className={`font-semibold text-xl ${
            data.variacao > 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          <span>R$ {data.valor}</span>
        </div>

        <div className="text-xs">
          <span>R$ {(data.qtdeAtivo * data.valor).toFixed(2)}</span>

          <span className="float-right">{data.qtdeAtivo} shares</span>
        </div>
      </div>
    </motion.button>
  );
}
