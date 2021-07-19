import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { useAppDispatch } from "./store";
import { init } from "./store/features/settings/settingsSlice";
import routes from "./routes";
import Header from "./shared/components/header";
import Sidebar from "./shared/components/sidebar";
import Dashboard from "./pages/dashboard";
import styles from "./App.module.scss";

function App() {
  const rdxDispatch = useAppDispatch();

  useEffect(() => {
    rdxDispatch(init());
  }, [rdxDispatch]);

  return (
    <>
      <Header />
      <section className={styles.Container}>
        <Sidebar />
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
