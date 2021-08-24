import { ComponentPropsWithRef } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

interface Props extends ComponentPropsWithRef<"p"> {}
const Subtitle = ({ className, children, ...rest }: Props) => {
  return (
    <p className={classNames(styles.Subtitle, className)} {...rest}>
      {children}
    </p>
  );
};
Subtitle.displayName = "ListTile.Subtitle";
export default Subtitle;
