import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Switch>
      <Route path={routes.dashboard.path}>
        <Dashboard />
      </Route>
    </Switch>
  );
}

export default App;
