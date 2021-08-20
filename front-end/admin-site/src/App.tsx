import { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { useAppDispatch } from "./store";
import { init } from "./store/features/settings/settingsSlice";
import { getThemeFromStorage, setThemeClass } from "./shared/hooks/useTheme";
import routes from "./routes";
import Header from "./shared/components/header";
import Sidebar from "./shared/components/sidebar";
import styles from "./App.module.scss";

const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
  const rdxDispatch = useAppDispatch();

  useEffect(() => {
    rdxDispatch(init());
  }, [rdxDispatch]);

  useEffect(() => {
    setThemeClass(getThemeFromStorage());
  }, []);

  return (
    <>
      <Header />
      <section className={styles.Container}>
        <Sidebar />
        <main className={styles.Main}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path={routes.dashboard.path}>
                <Dashboard />
              </Route>
            </Switch>
          </Suspense>
        </main>
      </section>
    </>
  );
}

export default App;
