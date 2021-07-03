import { FC } from "react";
import styles from "./index.module.scss";

interface Props {}

const Dashboard: FC<Props> = () => {
  console.log("dashboard");
  return (
    <div className={styles.root}>
      <div>dashboard</div>
    </div>
  );
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
