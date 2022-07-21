import { Announcements, FundsInput } from "components";

export default function Funds() {
  return (
    <div className="grow flex flex-col">
      <FundsInput />

      <Announcements />
    </div>
  );
}
