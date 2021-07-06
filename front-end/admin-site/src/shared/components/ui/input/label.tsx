import { forwardRef, LabelHTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

interface Props extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  variant?:
    | "info"
    | "danger"
    | "warning"
    | "success"
    | "accent"
    | "primary"
    | "secondary";
  id?: string;
  required?: boolean;
}

const Label = forwardRef<HTMLLabelElement, Props>(
  (
    { id, className, variant = "accent", required = false, children, ...rest },
    ref
  ) => {
    return (
      <label
        htmlFor={id}
        ref={ref}
        className={classNames(styles.Label, className, `text-${variant}`)}
        {...rest}
      >
        {children} {required && <b>*</b>}
      </label>
    );
  }
);

Label.displayName = "InputLabel";

export default Label;
