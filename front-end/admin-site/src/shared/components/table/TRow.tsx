import { ComponentPropsWithoutRef, ReactElement } from "react";
import classNames from "classnames";

import { TCellProps } from "./TCell";
import styles from "./index.module.scss";

export interface TRowProps extends ComponentPropsWithoutRef<"tr"> {
  children?: ReactElement<TCellProps> | ReactElement<TCellProps>[];
}

const TRow = ({ className, children, ...rest }: TRowProps) => {
  return (
    <tr className={classNames(styles.TRow, className)} {...rest}>
      {children}
    </tr>
  );
};
TRow.displayName = "Table.Row";
export default TRow;
