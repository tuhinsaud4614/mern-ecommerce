import { FC, useState } from "react";
import { BiFile } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";

import routes from "../../routes";
import Modal from "../../shared/components/modal";
import ThemeSwitch from "../../shared/components/theme-switch";
import Badge from "../../shared/components/ui/badge";
import Button, { IconButton } from "../../shared/components/ui/button";
import Checkbox from "../../shared/components/ui/checkbox";
import Input from "../../shared/components/ui/input";
import Link from "../../shared/components/ui/link";
import styles from "./index.module.scss";

interface Props {}

const Dashboard: FC<Props> = () => {
  const [s, setS] = useState<boolean>(false);
  const [m, setM] = useState<boolean>(false);
  console.log("dashboard");
  return (
    <div style={{ padding: "1.6rem" }}>
      <div className={styles.root} style={{ padding: "1.6rem" }}>
        <ThemeSwitch />
        <Link to={routes.dashboard.path}>Dashboard</Link>
        <Button
          startIcon={<BiFile />}
          endIcon={<BiFile />}
          variant="info"
          onClick={() => setM(true)}
        >
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

        <Badge
          useFor={
            <IconButton variant="success">
              <BiFile />
            </IconButton>
          }
        >
          1
        </Badge>
      </div>
      <Input multiline rows={4} />
      <Input
        label="Hello"
        helperText="hi"
        icon={[<FiEye />, <FiEyeOff />]}
        required
      />
      <Input
        label="Hello"
        helperText="hi"
        icon={<FiEye />}
        valid={false}
        required
      />
      <Checkbox
        onChange={(e) => {
          e.target.checked ? setS(true) : setS(false);
        }}
        label="checkbox"
        checked={s}
      />
      <Modal open={m} onHide={() => setM(false)}>
        <Modal.Head closeIcon>h</Modal.Head>
        <Modal.Body>h</Modal.Body>
        <Modal.Foot align="start">
          <Button startIcon={<BiFile />} endIcon={<BiFile />} variant="warning">
            button
          </Button>
          <Button startIcon={<BiFile />} endIcon={<BiFile />} variant="success">
            button
          </Button>
        </Modal.Foot>
      </Modal>
    </div>
  );
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
