import { Button } from "flowbite-react";
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

export default function Paper({ data }: Props) {
  const { tradeTicker } = usePaper(data);

  return (
    <div>
      <div>
        {data.CodAtivo}

        {data.Valor}

        {data.QteAtivo}
      </div>

      <Button onClick={tradeTicker}>Trade</Button>
    </div>
  );
}
