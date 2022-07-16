import Home from "pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="max-w-md">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
