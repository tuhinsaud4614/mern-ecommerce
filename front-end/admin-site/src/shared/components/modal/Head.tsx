import { ElementType, forwardRef, HTMLAttributes, useContext } from "react";
import { FiX } from "react-icons/fi";
import classNames from "classnames";

import { ModalContext } from ".";
import { IconButton } from "../ui/button";
import styles from "./index.module.scss";

export interface HeadProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  closeIcon?: boolean;
  as?: ElementType;
}

const Head = forwardRef<HTMLElement, HeadProps>(
  ({ as: Component = "h1", className, closeIcon, children, ...rest }, ref) => {
    const { onHide } = useContext(ModalContext);
    return (
      <header
        className={classNames(styles.Head, className)}
        ref={ref}
        {...rest}
      >
        <Component className={classNames(styles["HeadTitle"])}>
          {children}
        </Component>
        {closeIcon && (
          <IconButton
            className={classNames(styles["HeadIcon"])}
            variant="danger"
            onClick={onHide}
          >
            <FiX />
          </IconButton>
        )}
      </header>
    );
  }
);

Head.displayName = "Modal.Head";

export default Head;
