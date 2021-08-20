import { ComponentPropsWithoutRef, FC, useContext, useState } from "react";
import { FiChevronUp } from "react-icons/fi";
import classNames from "classnames";

import { ActionTypes, TableContext } from "./reducer";
import AnimatedIcon from "../ui/animated-icon";
import styles from "./index.module.scss";

export interface TCellProps extends ComponentPropsWithoutRef<"td"> {
  as?: "td" | "th";
  onSort?(type: "asc" | "dsc"): void;
}

const TCell: FC<TCellProps> = ({
  as: Component = "td",
  className,
  onSort,
  children,
  ...rest
}: TCellProps) => {
  const [sortType, setSortType] = useState<"asc" | "dsc">("asc");
  const { dispatch: rdxDispatch } = useContext(TableContext);
  return (
    <Component
      onClick={
        onSort
          ? () => {
              setSortType((prev) => (prev === "asc" ? "dsc" : "asc"));
              onSort(sortType);
              rdxDispatch({ type: ActionTypes.INIT });
            }
          : undefined
      }
      className={classNames(
        className,
        Component === "th" ? styles.TH : styles.TD,
        onSort && styles.Sortable
      )}
      {...rest}
    >
      {onSort && (
        <AnimatedIcon
          initial={{ rotate: "0deg" }}
          animate={
            sortType === "dsc" ? { rotate: "-180deg" } : { rotate: "0deg" }
          }
        >
          <FiChevronUp />
        </AnimatedIcon>
      )}
      {children}
    </Component>
  );
};
TCell.displayName = "Table.Cell";
export default TCell;
