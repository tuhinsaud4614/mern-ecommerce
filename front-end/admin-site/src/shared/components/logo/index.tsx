import classNames from "classnames";
import { ComponentPropsWithRef } from "react";

import styles from "./index.module.scss";

const Logo = ({ className, ...rest }: ComponentPropsWithRef<"span">) => {
  return (
    <span className={classNames(styles.Root, className)} {...rest}>
      <span>E</span>
      <span>SHOP</span>
    </span>
  );
};

Logo.displayName = "Logo";

export default Logo;
