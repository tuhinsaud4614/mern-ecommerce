import { ComponentPropsWithoutRef, FC } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

export interface TCellProps extends ComponentPropsWithoutRef<"td"> {
  as?: "td" | "th";
}

const TCell: FC<TCellProps> = ({
  as: Component = "td",
  scope,
  className,
  children,
  ...rest
}: TCellProps) => {
  return (
    <Component
      className={classNames(
        className,
        Component === "th" ? styles.TH : styles.TD
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
TCell.displayName = "Table.Cell";
export default TCell;
