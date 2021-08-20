import { ReactNode, useReducer, useRef } from "react";
import classNames from "classnames";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import reducer, { ActionTypes, setInitial, TableContext } from "./reducer";
import { IconButton } from "../ui/button";
import Select from "../select";
import THead from "./THead";
import TBody from "./TBody";
import TRow from "./TRow";
import TCell from "./TCell";
import styles from "./index.module.scss";

interface Props {
  count?: number;
  filter?: {
    list?: string[];
    onFilter(value: string): void;
  };
  title?: string;
  children?: ReactNode | ReactNode[];
}
const Table = ({ count, filter, title, children }: Props) => {
  const [state, dispatch] = useReducer(reducer, setInitial(count || 0));
  const ref = useRef<HTMLInputElement>(null);

  return (
    <section className={classNames(styles.Container)}>
      <TableContext.Provider value={{ ...state, dispatch }}>
        <header className={classNames(styles.Header)}>
          {title && <h1>{title}</h1>}
          {filter && (
            <>
              <input
                ref={ref}
                name="tableFilter"
                onChange={(e) => {}}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    dispatch({ type: ActionTypes.INIT });
                    ref.current && filter.onFilter(ref.current.value);
                  }
                }}
                list="table-filter-list"
                className={classNames(styles.Filter)}
              />
              {filter.list && (
                <datalist id="table-filter-list">
                  {filter.list.map((el, index) => (
                    <option key={index} value={el} />
                  ))}
                </datalist>
              )}
            </>
          )}
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
