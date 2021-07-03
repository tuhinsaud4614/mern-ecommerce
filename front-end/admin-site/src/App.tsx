import { BiFile } from "react-icons/bi";

import Button, { IconButton } from "./shared/components/ui/button";
import "./App.scss";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import ThemeSwitch from "./shared/components/theme-switch";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <Switch>
      <Route path={routes.dashboard.path}>
        <Dashboard />
        <div className="App">
          <ThemeSwitch />
          <Button
            style={{ marginLeft: "8px" }}
            startIcon={<BiFile />}
            endIcon={<BiFile />}
            variant="danger"
            // onClick={() => changeTheme("dark")}
            // pending
          >
            button
          </Button>
          <IconButton
            style={{ marginLeft: "8px" }}
            variant="success"
            // onClick={() => changeTheme("light")}
            // pending
          >
            <BiFile />
          </IconButton>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
