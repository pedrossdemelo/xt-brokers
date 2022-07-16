import Header from "components/Header";
import Dashboard from "pages/Dashboard";
import Funds from "pages/Funds";
import Home from "pages/Home";
import Trade from "pages/Trade";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="max-w-md">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="trade/:ticker" element={<Trade />} />
        </Route>
        <Route path="funds" element={<Funds />} />
      </Routes>
    </div>
  );
}

export default App;
