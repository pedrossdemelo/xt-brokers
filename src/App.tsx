import Header from "components/Header";
import PrivateRoutes from "components/PrivateRoutes";
import useUserData from "hooks/useUserData";
import Dashboard from "pages/Dashboard";
import Funds from "pages/Funds";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Trade from "pages/Trade";
import { Route, Routes } from "react-router-dom";

function App() {
  const { user } = useUserData();
  const loggedIn = !!user;

  return (
    <div className="max-w-md">
      <Header />
      <Routes>
        <Route element={<PrivateRoutes when={loggedIn} redirectTo="/" />}>
          <Route path="/login" element={<Home />} />
        </Route>
        <Route element={<PrivateRoutes when={!loggedIn} redirectTo="/login" />}>
          <Route path="/" element={<Dashboard />}>
            <Route path="trade/:ticker" element={<Trade />} />
          </Route>
          <Route path="funds" element={<Funds />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
