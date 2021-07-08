import { forwardRef, InputHTMLAttributes } from "react";
import { motion, Variants } from "framer-motion";
import classNames from "classnames";

import styles from "./index.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  block?: boolean;
  classes?: {
    root?: string;
    box?: string;
    label?: string;
  };
  label?: string;
  variant?: "accent" | "info" | "danger" | "warning" | "success";
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const Checkbox = forwardRef<HTMLInputElement, Props>(
  (
    {
      block = false,
      checked = false,
      classes,
      label,
      type = "checkbox",
      variant = "accent",
      ...rest
    },
    ref
  ) => {
    return (
      <label
        className={classNames(
          styles.Root,
          block && styles.Block,
          classes?.root
        )}
      >
        <input ref={ref} type={type} {...rest} />
        <span
          className={classNames(styles.Box, classes?.box, `border-${variant}`)}
        >
          <motion.span
            className={classNames(`bg-${variant}`)}
            initial="hidden"
            variants={variants}
            animate={checked ? "visible" : "hidden"}
          />
        </span>
        {label && (
          <span
            className={classNames(
              styles.Label,
              classes?.label,
              `text-${variant}`
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
