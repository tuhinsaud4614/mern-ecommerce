import { ReactNode, useReducer, useRef } from "react";
import classNames from "classnames";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import reducer, { ActionTypes, setInitial, TableContext } from "./reducer";
import { IconButton } from "../ui/button";
import THead from "./THead";
import TBody from "./TBody";
import TRow from "./TRow";
import TCell from "./TCell";
import styles from "./index.module.scss";
import SelectDefault from "../select/SelectDefault";

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
            <div>
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
                placeholder="Search here."
              />
              {filter.list && (
                <datalist id="table-filter-list">
                  {filter.list.map((el, index) => (
                    <option key={index} value={el} />
                  ))}
                </datalist>
              )}
            </div>
          )}
        </header>
        <div className={classNames(styles.Body)}>
          <table className={classNames(styles.Root)}>{children}</table>
        </div>
      </TableContext.Provider>
      <footer className={classNames(styles.Footer)}>
        {count && (
          <div className={classNames(styles.Pagination)}>
            <div className={classNames(styles.PageRows)}>
              <span>Rows Per Page:</span>
              <SelectDefault
                className={styles.Select}
                onChange={(e) =>
                  dispatch({
                    type: ActionTypes.ROW_CHANGE,
                    payload: Number(e.target.value),
                  })
                }
              >
                <SelectDefault.Option value="5">5</SelectDefault.Option>
                <SelectDefault.Option value="10">10</SelectDefault.Option>
                <SelectDefault.Option value="15">15</SelectDefault.Option>
                <SelectDefault.Option value="20">20</SelectDefault.Option>
              </SelectDefault>
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
      </footer>
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
