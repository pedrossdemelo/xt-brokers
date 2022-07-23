import { Header, PrivateRoutes } from "components";
import { useUserData } from "hooks";
import { Dashboard, Funds, Home, NotFound, Trade, Transactions } from "pages";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

function App() {
  const { loggedIn, loading } = useUserData();

  if (loading) return <div>loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
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
