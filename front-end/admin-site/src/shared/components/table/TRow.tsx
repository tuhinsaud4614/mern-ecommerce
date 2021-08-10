import { ComponentPropsWithoutRef, ReactElement } from "react";

import { TCellProps } from "./TCell";

export interface TRowProps extends ComponentPropsWithoutRef<"tr"> {
  children?: ReactElement<TCellProps> | ReactElement<TCellProps>[];
}

const TRow = ({ className, children, ...rest }: TRowProps) => {
  return <tr {...rest}>{children}</tr>;
};
TRow.displayName = "Table.Row";
export default TRow;
