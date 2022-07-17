import AllPapers from "components/AllPapers";
import UserPapers from "components/UserPapers";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function useDashboard() {
  const navigate = useNavigate();

  return {
    
  };
}

export default function Dashboard() {
  const { } = useDashboard();

  return (
    <>
      <div>Dashboard</div>
      <UserPapers />
      <AllPapers />
      <Outlet />
    </>
  );
}
