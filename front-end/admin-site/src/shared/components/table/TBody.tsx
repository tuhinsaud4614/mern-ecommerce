import { ComponentPropsWithoutRef, ReactElement, useContext } from "react";

import { TableContext } from "./reducer";
import { TRowProps } from "./TRow";

export interface TBodyProps extends ComponentPropsWithoutRef<"tbody"> {
  children?: ReactElement<TRowProps> | ReactElement<TRowProps>[];
}

const TBody = ({ children, ...rest }: TBodyProps) => {
  const { start, end } = useContext(TableContext);
  console.log("TBody");
  return (
    <tbody {...rest}>
      {Array.isArray(children) ? children.slice(start - 1, end) : children}
    </tbody>
  );
};
TBody.displayName = "Table.Body";
export default TBody;
