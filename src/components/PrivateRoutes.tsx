import { Navigate, Outlet } from "react-router-dom";

type Props = {
  when: boolean;
  redirectTo: string;
};

export default function RestrictedRoute({ when, redirectTo }: Props) {
  if (when) return <Navigate to={redirectTo} replace />;
  return <Outlet />;
}
