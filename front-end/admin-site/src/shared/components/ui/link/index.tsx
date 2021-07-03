import { FC, ReactComponentElement } from "react";
import { Link as RLink, LinkProps } from "react-router-dom";
import { IconType } from "react-icons";
import classNames from "classnames";

import styles from "./index.module.scss";

interface Props extends LinkProps {
  variant?: "info" | "danger" | "warning" | "success";
  className?: string;
  startIcon?: ReactComponentElement<IconType>;
  endIcon?: ReactComponentElement<IconType>;
}

const Link: FC<Props> = ({
  startIcon,
  variant,
  className,
  children,
  endIcon,
  ...rest
}) => {
  return (
    <RLink
      className={classNames(styles.Root, styles[`Root_${variant}`], className)}
      {...rest}
    >
      {startIcon && startIcon}
      {children}
      {endIcon && endIcon}
    </RLink>
  );
};

Link.displayName = "Link";

export default Link;
