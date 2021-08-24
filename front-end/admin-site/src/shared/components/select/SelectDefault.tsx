import { ComponentPropsWithRef } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

const Option = ({ ...rest }: ComponentPropsWithRef<"option">) => {
  return <option {...rest} />;
};
Option.displayName = "SelectDefault.Option";

interface SelectProps extends ComponentPropsWithRef<"select"> {
  label?: string;
  helperText?: string;
  error?: boolean;
  classes?: {
    wrapper?: string;
    label?: string;
    helperText?: string;
  };
}
const Select = ({
  className,
  classes,
  error = false,
  helperText,
  id,
  label,
  required = false,
  ...rest
}: SelectProps) => {
  let component = (
    <select
      id={id}
      className={classNames(styles.SelectDefault, className)}
      required={required}
      {...rest}
    />
  );
  return label || helperText ? (
    <div className={classes?.wrapper}>
      {label && (
        <label
          className={classNames(styles.Label, classes?.label)}
          htmlFor={id}
        >
          {label} {required && <b>*</b>}
        </label>
      )}
      {component}
      {helperText && (
        <p
          className={classNames(
            styles.Helper,
            error && "text-danger",
            classes?.helperText
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  ) : (
    component
  );
};
Select.displayName = "SelectDefault";
const SelectDefault = Object.assign(Select, {
  Option: Option,
});
export default SelectDefault;
