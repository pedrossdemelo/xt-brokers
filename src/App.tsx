import Home from "pages/Home";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="max-w-md">
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
