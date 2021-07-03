import classNames from "classnames";
import { ButtonHTMLAttributes, forwardRef, ReactComponentElement } from "react";
import { IconType } from "react-icons";

import styles from "./index.module.scss";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  pending?: boolean;
  className?: string;
  variant?: "info" | "danger" | "warning" | "success";
  children: ReactComponentElement<IconType>;
}

export const IconButton = forwardRef<HTMLButtonElement, IProps>(
  (
    {
      pending = false,
      disabled = false,
      variant,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(
          styles.root_round,
          styles[`root_round_${variant}`],
          className
        )}
        disabled={pending || disabled}
        {...rest}
      >
        {children}
        {pending && <span className={`${styles.pending}`}></span>}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  pending?: boolean;
  className?: string;
  variant?: "info" | "danger" | "warning" | "success";
  startIcon?: ReactComponentElement<IconType>;
  endIcon?: ReactComponentElement<IconType>;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      pending = false,
      disabled = false,
      startIcon,
      endIcon,
      variant,
      className,
      children,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(
          styles.root,
          styles[`root_${variant}`],
          className
        )}
        disabled={pending || disabled}
        {...rest}
      >
        {startIcon && startIcon}
        {children}
        {endIcon && endIcon}
        {pending && <span className={`${styles.pending}`}></span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
