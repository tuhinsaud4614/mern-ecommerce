import { FC } from "react";
import { BiFile } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";

import routes from "../../routes";
import ThemeSwitch from "../../shared/components/theme-switch";
import Button, { IconButton } from "../../shared/components/ui/button";
import Input from "../../shared/components/ui/input";
import Link from "../../shared/components/ui/link";
import styles from "./index.module.scss";

interface Props {}

const Dashboard: FC<Props> = () => {
  console.log("dashboard");
  return (
    <div style={{ padding: "1.6rem" }}>
      <div className={styles.root} style={{ padding: "1.6rem" }}>
        <ThemeSwitch />
        <Link to={routes.dashboard.path}>Dashboard</Link>
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
      <Input multiline rows={4} />
      <Input label="Hello" helperText="hi" icon={[<FiEye />, <FiEyeOff />]} required />
    </div>
  );
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
