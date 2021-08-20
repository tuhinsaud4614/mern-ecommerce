import { ComponentPropsWithoutRef, ReactElement } from "react";

import { TRowProps } from "./TRow";

export interface THeadProps extends ComponentPropsWithoutRef<"thead">{
  children?: ReactElement<TRowProps> | ReactElement<TRowProps>[];
}

const THead = ({ children, ...rest }: THeadProps ) => {
  return <thead {...rest}>{children}</thead>;
};
THead.displayName = "Table.Head";
export default THead;
