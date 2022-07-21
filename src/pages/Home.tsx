import { LoginInput } from "components";

export default function Home() {
  return (
    <div className="flex grow">
      <div className="hidden md:block w-72 bg-slate-900 text-white py-8 px-12">
        <h1 className="text-4xl">XT Brokers</h1>

        <p className="w-full text-sm">Trading simulator</p>
      </div>

      <div className="flex flex-col grow items-center justify-center p-4 md:p-10">
        <LoginInput />
      </div>
    </div>
  );
}
