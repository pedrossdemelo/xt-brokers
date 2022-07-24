import { PresentationChartBarIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { useUserData } from "hooks";
import CarouselPaper from "./CarouselPaper";

function slideBy(amount: number) {
  return () => {
    const slider = document.getElementById("slider");
    if (!slider) return;
    slider.scrollLeft = slider.scrollLeft + amount;
  };
}

export default function UserPapers() {
  const { userPapers, portfolio, hideMoney } = useUserData();

  return (
    <div>
      <div className="mt-4 mx-4 md:mx-6 flex justify-between font-medium text-xl">
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

      <div className="relative">
        {!userPapers.length ? (
          <div
            className="h-36 border text-gray-500/60 mx-4 text-sm font-medium
            flex border-gray-200 rounded-xl items-center justify-center"
          >
            <PresentationChartBarIcon className="absolute h-20 opacity-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />

            <p>Start trading to view your portfolio!</p>
          </div>
        ) : (
          <div
            id="slider"
            className="grid grid-rows-1 grid-flow-col gap-4 px-4
            scroll-smooth overflow-x-scroll mouse:scroll-hide py-2 mb-2 justify-start"
          >
            <button
              onClick={slideBy(-500)}
              className="touch:hidden absolute flex justify-center items-center bg-opacity-10
            h-10 w-10 rounded-full bg-slate-900 left-4 top-1/2 -translate-y-1/2 hover:bg-opacity-30 transition"
            >
              <ArrowLeftIcon className="h-6" />
            </button>

            {userPapers.map((paper) => (
              <CarouselPaper key={paper.codAtivo} data={paper} />
            ))}

            <button
              onClick={slideBy(500)}
              className="touch:hidden absolute flex justify-center items-center bg-opacity-10
            h-10 w-10 rounded-full bg-slate-900 right-4 top-1/2 -translate-y-1/2 hover:bg-opacity-30 transition"
            >
              <ArrowRightIcon className="h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
