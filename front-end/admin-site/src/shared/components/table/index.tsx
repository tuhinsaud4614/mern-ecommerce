import { useReducer } from "react";
import classNames from "classnames";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import reducer, { ActionTypes, TableState } from "./reducer";
import Select from "../select";
import { IconButton } from "../ui/button";
import styles from "./index.module.scss";
import Badge from "../ui/badge";

interface Props {
  count?: number;
  title?: string;
}
const Table = ({ count, title }: Props) => {
  const initialState: TableState = {
    count: count || 11,
    current: 1,
    row: 5,
    end: count && count < 5 ? count : 5,
    start: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <section className={classNames(styles.Container)}>
      <header className={classNames(styles.Header)}>
        {title && <h1>{title}</h1>}
        <div className={classNames(styles.Pagination)}>
          <div className={classNames(styles.PageRows)}>
            <span>Rows Per Page:</span>
            <Select
              classes={{ root: styles.Select }}
              options={[
                { name: "5", value: "5" },
                { name: "10", value: "10" },
                { name: "15", value: "15" },
                { name: "20", value: "20" },
              ]}
              hideOnSelect
              onSelect={({ value }) => {
                dispatch({
                  type: ActionTypes.ROW_CHANGE,
                  payload: Number(value),
                });
              }}
            />
          </div>
          <div className={classNames(styles.PageActions)}>
            <span>
              {state.start}-{state.end} of {state.count}:
            </span>
            <IconButton
              disabled={state.start === 1}
              className={styles.Btn}
              onClick={() =>
                dispatch({ type: ActionTypes.PAGE_CHANGE, payload: "prev" })
              }
            >
              <FiChevronLeft />
            </IconButton>
            <IconButton
              disabled={state.end === state.count}
              className={styles.Btn}
              onClick={() =>
                dispatch({ type: ActionTypes.PAGE_CHANGE, payload: "next" })
              }
            >
              <FiChevronRight />
            </IconButton>
          </div>
        </div>
      </header>
      <div className={classNames(styles.Body)}>
        <table className={classNames(styles.Root)}>
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Payment Method</th>
              <th scope="col">Order Date</th>
              <th scope="col">Delivery Date</th>
              <th scope="col">Status</th>
              <th scope="col">Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Cash</td>
              <td>September 9th 2020 1:15:18 am</td>
              <td>September 12th 2020</td>
              <td>
                <Badge variant="info">processing</Badge>
              </td>
              <td>$120.00</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Cash</td>
              <td>September 9th 2020 1:15:18 am</td>
              <td>September 12th 2020</td>
              <td>
                <Badge variant="success">Delivered</Badge>
              </td>
              <td>$120.00</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Cash</td>
              <td>September 9th 2020 1:15:18 am</td>
              <td>September 12th 2020</td>
              <td>
                <Badge variant="warning">shipping</Badge>
              </td>
              <td>$120.00</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer className={classNames(styles.Footer)}></footer>
    </section>
  );
};

Table.displayName = "Table";
export default Table;
