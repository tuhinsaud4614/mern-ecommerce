import { ComponentPropsWithRef } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

interface Props extends ComponentPropsWithRef<"h1"> {}
const Title = ({ className, children, ...rest }: Props) => {
  return (
    <h1 className={classNames(styles.Title, className)} {...rest}>
      {children}
    </h1>
  );
};
Title.displayName = "ListTile.Title";
export default Title;
