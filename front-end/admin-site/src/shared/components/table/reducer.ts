import { createContext, Dispatch } from "react";

export interface TableState {
  count: number;
  current: number;
  start: number;
  end: number;
  row: number;
}

export enum ActionTypes {
  ROW_CHANGE = "ROW_CHANGE",
  PAGE_CHANGE = "PAGE_CHANGE",
}

interface PageChange {
  type: typeof ActionTypes.PAGE_CHANGE;
  payload: "next" | "prev";
}
interface RowChange {
  type: typeof ActionTypes.ROW_CHANGE;
  payload: number;
}
export type Actions = PageChange | RowChange;

function reducer(state: TableState, action: Actions): TableState {
  switch (action.type) {
    case ActionTypes.PAGE_CHANGE:
      const { count, current, end, row, start } = state;
      if (count <= row) {
        return {
          ...state,
          current: 1,
          start: 1,
          end: count,
        };
      }
      if (action.payload === "next" && start + row <= count) {
        return {
          ...state,
          current: current + 1,
          start: end + 1,
          end: end + row <= count ? end + row : count,
        };
      }
      if (action.payload === "prev" && start > 1) {
        const calc = Math.floor(count / row) * row;
        const newEnd = end > calc ? calc : end - row;
        return {
          ...state,
          current: current - 1,
          start: newEnd - row + 1,
          end: newEnd,
        };
      }
      return state;
    case ActionTypes.ROW_CHANGE:
      return {
        ...state,
        current: 1,
        row: action.payload,
        end: state.count < action.payload ? state.count : action.payload,
        start: 1,
      };
    default:
      return state;
  }
}

export interface ContextProps extends TableState {
  dispatch: Dispatch<Actions>;
}

export const TableContext = createContext({} as ContextProps);

export default reducer;
