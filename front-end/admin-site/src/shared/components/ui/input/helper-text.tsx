import { forwardRef, HTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  variant?: "info" | "danger" | "warning" | "success";
}

const HelperText = forwardRef<HTMLSpanElement, Props>(
  ({ className, variant = "danger", children, ...rest }, ref) => {
    return (
      <span
        ref={ref}
        className={classNames(styles.Helper, className, `text-${variant}`)}
        {...rest}
      >
        {children}
      </span>
    );
  }
);

HelperText.displayName = "HelperText";

export default HelperText;
