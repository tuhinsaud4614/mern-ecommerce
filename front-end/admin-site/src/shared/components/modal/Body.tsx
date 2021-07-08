import { forwardRef, HTMLAttributes } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

export interface BodyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Body = forwardRef<HTMLDivElement, BodyProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div className={classNames(styles.Body, className)} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

Body.displayName = "Modal.Body";

export default Body;
