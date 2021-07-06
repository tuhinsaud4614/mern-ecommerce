import classNames from "classnames";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

import styles from "./index.module.scss";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  useFor?: JSX.Element;
  className?: string;
  children: ReactNode;
  variant?:
    | "info"
    | "danger"
    | "warning"
    | "success"
    | "primary"
    | "secondary"
    | "accent";
  position?: "left" | "right";
}

const Badge = forwardRef<HTMLSpanElement, Props>(
  (
    { useFor, className, variant = "danger", position = "right", children },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={classNames(
          styles.Root,
          className,
          useFor ? styles.Floating : `bg-${variant}`
        )}
      >
        {useFor ? useFor : children}
        {useFor && (
          <motion.b
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={classNames(
              styles[position],
              styles[`Floating-${variant}`]
            )}
          >
            {children}
          </motion.b>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
