import { ComponentPropsWithRef } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

interface Props extends ComponentPropsWithRef<"img"> {
  variant?: "accent" | "info" | "danger" | "warning" | "success";
}

const Avatar = ({
  alt = "avatar",
  className,
  src,
  children,
  variant = "accent",
  ...rest
}: Props) => {
  return (
    <div
      className={classNames(
        styles.Root,
        className,
        src ? "bg-disabled" : `bg-${variant}`
      )}
    >
      {src ? <img alt={alt} src={src} {...rest} /> : children}
    </div>
  );
};

Avatar.displayName = "Avatar";

export default Avatar;
