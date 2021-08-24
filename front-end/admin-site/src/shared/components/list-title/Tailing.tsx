import { ComponentPropsWithRef } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

interface Props extends ComponentPropsWithRef<"div"> {}
const Tailing = ({ className, children, ...rest }: Props) => {
  return (
    <div className={classNames(styles.Tailing, className)} {...rest}>
      {children}
    </div>
  );
};
Tailing.displayName = "ListTile.Tailing";
export default Tailing;
