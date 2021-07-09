import { FC, useState } from "react";
import { BiFile } from "react-icons/bi";
import { FiEye, FiEyeOff } from "react-icons/fi";

import routes from "../../routes";
import Modal from "../../shared/components/modal";
import ThemeSwitch from "../../shared/components/theme-switch";
import Badge from "../../shared/components/ui/badge";
import Button, { IconButton } from "../../shared/components/ui/button";
import CheckboxRadio from "../../shared/components/ui/checkbox-radio";
import Input from "../../shared/components/ui/input";
import Link from "../../shared/components/ui/link";
import styles from "./index.module.scss";

interface Props {}

const Dashboard: FC<Props> = () => {
  const [s, setS] = useState<boolean>(false);
  const [r, setR] = useState<"left" | "right">("right");
  const [m, setM] = useState<boolean>(false);
  console.log("dashboard", r);
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
        <Button variant="danger">Button</Button>
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
          max={1300}
          hideFloat={s}
          position={{ horizontal: r }}
          useFor={
            <IconButton variant="success">
              <BiFile />
            </IconButton>
          }
        >
          1334
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
      <CheckboxRadio
        onChange={(e) => {
          setS(e.target.checked);
        }}
        label="show"
        checked={s}
      />
      <CheckboxRadio
        value="left"
        name="r"
        type="radio"
        onChange={(e) => {
          setR(e.target.value as "left");
        }}
        label="left"
        checked={r === "left"}
      />
      <CheckboxRadio
        value="right"
        name="r"
        type="radio"
        onChange={(e) => {
          setR(e.target.value as "right");
        }}
        label="right"
        checked={r === "right"}
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
