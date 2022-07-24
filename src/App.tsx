import { Header, Loader, PrivateRoutes } from "components";
import { useUserData } from "hooks";
import { Home } from "pages";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

const SDashboard = React.lazy(() => import("pages/Dashboard"));
const SFunds = React.lazy(() => import("pages/Funds"));
const SNotFound = React.lazy(() => import("pages/NotFound"));
const STrade = React.lazy(() => import("pages/Trade"));
const STransactions = React.lazy(() => import("pages/Transactions"));

function Suspended({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loader opacity={5} />}>{children}</Suspense>;
}

const Dashboard = () => (
  <Suspended>
    <SDashboard />
  </Suspended>
);
const Funds = () => (
  <Suspended>
    <SFunds />
  </Suspended>
);
const NotFound = () => (
  <Suspended>
    <SNotFound />
  </Suspended>
);
const Trade = () => (
  <Suspended>
    <STrade />
  </Suspended>
);
const Transactions = () => (
  <Suspended>
    <STransactions />
  </Suspended>
);

function App() {
  const { loggedIn, loading } = useUserData();

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Routes>
        <Route element={<PrivateRoutes when={loggedIn} redirectTo="/" />}>
          <Route path="login" element={<Home />} />
        </Route>

        <Route element={<PrivateRoutes when={!loggedIn} redirectTo="/login" />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="trade/:ticker" element={<Trade />} />
          </Route>

          <Route path="funds" element={<Funds />} />

          <Route path="transactions" element={<Transactions />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
