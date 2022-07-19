import { PresentationChartBarIcon } from "@heroicons/react/outline";
import { useUserData } from "hooks";
import CarouselPaper from "./CarouselPaper";

export default function UserPapers() {
  const { userPapers, portfolio, hideMoney } = useUserData();

  return (
    <div className="p-4">
      <div className="mb-2 flex justify-between font-medium text-xl">
        <h2>Portfolio</h2>

        {!!userPapers.length && (
          <h2
            className={`text-right rounded pl-2 ${
              hideMoney && "text-slate-100 select-none bg-slate-100"
            }`}
          >
            R$ {portfolio.toFixed(2)}
          </h2>
        )}
      </div>

      <div className="flex gap-4 px-4 -mx-4 relative overflow-x-scroll">
        {userPapers.map((paper) => (
          <CarouselPaper key={paper.CodAtivo} data={paper} />
        ))}

        {!userPapers.length && (
          <div className="h-36 border text-gray-500/60 text-sm font-medium w-full flex border-gray-200 rounded-xl items-center justify-center">
            <PresentationChartBarIcon className="absolute h-20 opacity-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />

            <p>Start trading to view your portfolio!</p>
          </div>
        )}
      </div>
    </div>
  );
}
