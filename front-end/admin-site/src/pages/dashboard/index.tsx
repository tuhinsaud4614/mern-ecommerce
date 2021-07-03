import { FC } from "react";
import { BiFile } from "react-icons/bi";

import routes from "../../routes";
import ThemeSwitch from "../../shared/components/theme-switch";
import Button, { IconButton } from "../../shared/components/ui/button";
import Link from "../../shared/components/ui/link";
import styles from "./index.module.scss";

interface Props {}

const Dashboard: FC<Props> = () => {
  console.log("dashboard");
  return (
    <div className={styles.root}>
      <ThemeSwitch />
      <Link to={routes.dashboard.name}>Dashboard</Link>
      <Button startIcon={<BiFile />} endIcon={<BiFile />} variant="info">
        button
      </Button>
      <Button startIcon={<BiFile />} endIcon={<BiFile />} variant="danger">
        button
      </Button>
      <Button startIcon={<BiFile />} endIcon={<BiFile />} variant="warning">
        button
      </Button>
      <Button startIcon={<BiFile />} endIcon={<BiFile />} variant="success">
        button
      </Button>
      <Button
        startIcon={<BiFile />}
        endIcon={<BiFile />}
        variant="success"
        pending
      >
        button
      </Button>
      <IconButton variant="success">
        <BiFile />
      </IconButton>
    </div>
  );
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
