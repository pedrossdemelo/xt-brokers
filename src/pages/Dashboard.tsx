import { AllPapers, UserPapers } from "components";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="grow flex flex-col">
      <UserPapers />

      <AllPapers />

      <Outlet />
    </div>
  );
}
