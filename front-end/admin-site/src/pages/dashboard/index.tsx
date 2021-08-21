import { useState } from "react";
// import routes from "../../routes";
// import BreadCrumb from "../../shared/components/bread-crumb";
// import { FC, useState } from "react";
// import { BiFile } from "react-icons/bi";
// import { FiEye, FiEyeOff } from "react-icons/fi";

import Pagination from "../../shared/components/pagination";
import Table from "../../shared/components/table";
import Badge from "../../shared/components/ui/badge";

// import Select from "../../shared/components/select";

// import routes from "../../routes";
// import Modal from "../../shared/components/modal";
// import Badge from "../../shared/components/ui/badge";
// import Button, { IconButton } from "../../shared/components/ui/button";
// import CheckboxRadio from "../../shared/components/ui/checkbox-radio";
// import Input from "../../shared/components/ui/input";
// import Link from "../../shared/components/ui/link";
// import styles from "./index.module.scss";

// interface Props {}

const data = [
  {
    id: 1,
    type: "Cash",
    date: "September 9th 2020 1:15:18 am",
    delV: "September 12th 2020",
    badge: <Badge variant="info">Processing</Badge>,
    price: "$120.00",
    emp: "",
  },
  {
    id: 2,
    type: "Cash",
    date: "September 9th 2020 1:15:18 am",
    delV: "September 12th 2020",
    badge: <Badge variant="success">Delivered</Badge>,
    price: "$120.00",
    emp: "",
  },
  {
    id: 3,
    type: "Cash",
    date: "September 9th 2020 1:15:18 am",
    delV: "September 12th 2020",
    badge: <Badge variant="warning">Shipping</Badge>,
    price: "$120.00",
    emp: "",
  },
  {
    id: 4,
    type: "Cash",
    date: "September 9th 2020 1:15:18 am",
    delV: "September 12th 2020",
    badge: <Badge variant="info">Processing</Badge>,
    price: "$120.00",
    emp: "",
  },
  {
    id: 5,
    type: "Cash",
    date: "September 9th 2020 1:15:18 am",
    delV: "September 12th 2020",
    badge: <Badge variant="success">Delivered</Badge>,
    price: "$120.00",
    emp: "",
  },
  {
    id: 6,
    type: "Cash",
    date: "September 9th 2020 1:15:18 am",
    delV: "September 12th 2020",
    badge: <Badge variant="warning">Shipping</Badge>,
    price: "$120.00",
    emp: "",
  },
];

const Dashboard = () => {
  // const [s, setS] = useState<boolean>(false);
  // const [r, setR] = useState<"left" | "right">("right");
  // const [m, setM] = useState<boolean>(false);
  const setValue = useState<number>()[1];

  return (
    <div>
      <Table
        title="Hello"
        count={data.length}
        filter={{
          onFilter(value) {
            console.log(value);
          },
          list: ["hello", "hi"],
        }}
      >
        <Table.Head>
          <Table.Row>
            <Table.Cell scope="col" as="th">
              Order ID
            </Table.Cell>
            <Table.Cell scope="col" as="th" onSort={(x) => {}}>
              Payment Method
            </Table.Cell>
            <Table.Cell scope="col" as="th">
              Order Date
            </Table.Cell>
            <Table.Cell scope="col" as="th">
              Delivery Date
            </Table.Cell>
            <Table.Cell scope="col" as="th">
              Status
            </Table.Cell>
            <Table.Cell scope="col" as="th">
              Total
            </Table.Cell>
            <Table.Cell scope="col" as="th">
              Action
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell scope="row" as="th">
                {item.id}
              </Table.Cell>
              <Table.Cell scope="row">{item.type}</Table.Cell>
              <Table.Cell scope="row">{item.date}</Table.Cell>
              <Table.Cell scope="row">{item.delV}</Table.Cell>
              <Table.Cell scope="row">{item.badge}</Table.Cell>
              <Table.Cell scope="row">{item.price}</Table.Cell>
              <Table.Cell scope="row">{item.emp}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Pagination onTap={(page) => setValue(page)} />
      {/* <Select
        options={[
          { name: "Hi", value: "hi" },
          { name: "Hello", value: "hello" },
          { name: "Zoo", value: "zoo" },
        ]}
        hideOnSelect
        onSelect={({ value }) => {
          setValue(value);
        }}
        // searchable
      /> */}
      {/* <BreadCrumb>
        <BreadCrumb.Item to={routes.dashboard.path} exact>dashboard</BreadCrumb.Item>
        <BreadCrumb.Item to={routes.category.path} exact>category</BreadCrumb.Item>
      </BreadCrumb> */}
      {/* <div className={styles.root} style={{ padding: "1.6rem" }}>
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
          max={99}
          hideFloat={!s}
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
       */}
      {/* <Input multiline rows={4} />
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
      </Modal> */}
    </div>
  );
};

Dashboard.displayName = "Dashboard";

export default Dashboard;
