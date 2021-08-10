import { ReactNode, useReducer } from "react";
import classNames from "classnames";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import reducer, { ActionTypes, TableContext, TableState } from "./reducer";
import { IconButton } from "../ui/button";
import Select from "../select";
import THead from "./THead";
import TBody from "./TBody";
import TRow from "./TRow";
import TCell from "./TCell";
import styles from "./index.module.scss";

interface Props {
  count?: number;
  title?: string;
  children?:
    ReactNode | ReactNode[];
}
const Table = ({ count, title, children }: Props) => {
  const initialState: TableState = {
    count: count || 0,
    current: 1,
    row: 5,
    end: count && count < 5 ? count : 5,
    start: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <section className={classNames(styles.Container)}>
      <TableContext.Provider value={{ ...state, dispatch }}>
        <header className={classNames(styles.Header)}>
          {title && <h1>{title}</h1>}
          {count && (
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
          )}
        </header>
        <div className={classNames(styles.Body)}>
          <table className={classNames(styles.Root)}>{children}</table>
        </div>
      </TableContext.Provider>
      <footer className={classNames(styles.Footer)}></footer>
    </section>
  );
};

Table.displayName = "Table";
export default Object.assign(Table, {

  Head: THead,
  Body: TBody,
  Row: TRow,
  Cell: TCell,
});
