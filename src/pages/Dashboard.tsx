import { AllPapers, UserPapers } from "components";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="grow">
      <div>Dashboard</div>

      <UserPapers />

      <AllPapers />

      <Outlet />
    </div>
  );
}
