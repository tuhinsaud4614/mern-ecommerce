import { ComponentPropsWithRef } from "react";
import classNames from "classnames";

interface Props extends ComponentPropsWithRef<"div"> {}
const Leading = ({ className, children, ...rest }: Props) => {
  return (
    <div className={classNames(className)} {...rest}>
      {children}
    </div>
  );
};
Leading.displayName = "ListTile.Leading";
export default Leading;
