import { ViewGridIcon } from "@heroicons/react/solid";
import { LoginInput } from "components";

export default function Home() {
  return (
    <div className="flex grow">
      <div className="hidden md:flex w-72 relative items-center justify-between bg-slate-900 flex-col text-white py-8 px-12">
        <div>
          <h1 className="text-4xl font-medium">XT Brokers</h1>

          <p className="w-full text-sm text-right">Trading Simulator</p>
        </div>

        <ViewGridIcon className="h-56 opacity-5" />
      </div>

      <div className="flex flex-col grow items-center justify-center p-4 md:p-10">
        <LoginInput />
      </div>
    </div>
  );
}
