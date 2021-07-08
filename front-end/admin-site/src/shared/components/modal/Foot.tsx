import { forwardRef, HTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

export interface FootProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  align?: "start" | "center" | "end";
}

const Foot = forwardRef<HTMLDivElement, FootProps>(
  ({ align, className, children, ...rest }, ref) => {
    return (
      <div
        className={classNames(
          styles.Foot,
          align && styles[`Foot${align}`],
          className
        )}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Foot.displayName = "Modal.Foot";

export default Foot;
