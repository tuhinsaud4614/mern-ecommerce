import classNames from "classnames";
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

import styles from "./index.module.scss";

interface Props extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children: ReactNode;
  hideFloat?: boolean;
  max?: number;
  position?: { horizontal?: "left" | "right"; vertical?: "top" | "bottom" };
  variant?:
    | "info"
    | "danger"
    | "warning"
    | "success"
    | "primary"
    | "secondary"
    | "accent";
  useFor?: ReactNode;
}

const variants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1 },
};

function cutString(child: ReactNode, max?: number): string | ReactNode {
  return max && child && !Number.isNaN(child) && +child > max
    ? `${max}+`
    : child;
}

const Badge = forwardRef<HTMLSpanElement, Props>(
  (
    {
      useFor,
      className,
      hideFloat = false,
      max,
      variant = "danger",
      position,
      children,
    },
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
        {useFor ? useFor : cutString(children, max)}
        {useFor && (
          <AnimatePresence exitBeforeEnter>
            {!hideFloat && (
              <motion.b
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={classNames(
                  styles[position?.horizontal || "right"],
                  styles[position?.vertical || "top"],
                  styles[`Floating-${variant}`]
                )}
              >
                {cutString(children, max)}
              </motion.b>
            )}
          </AnimatePresence>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
