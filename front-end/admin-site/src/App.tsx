import { Route, Switch } from "react-router-dom";

import routes from "./routes";
import Header from "./shared/components/header";
import Dashboard from "./pages/dashboard";
import styles from "./App.module.scss";

function App() {
  return (
    <>
      <Header />
      <section className={styles.Container}>
        <main className={styles.Main}>
          <Switch>
            <Route path={routes.dashboard.path}>
              <Dashboard />
            </Route>
          </Switch>
        </main>
      </section>
    </>
  );
}

export default App;
