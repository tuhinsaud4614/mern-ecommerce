import { ComponentPropsWithRef } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

interface Props extends ComponentPropsWithRef<"div"> {
  variant?: "accent" | "info" | "danger" | "warning" | "success";
  src?: string;
  alt?: string;
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
      {...rest}
    >
      {src ? <img alt={alt} src={src} /> : children}
    </div>
  );
};

Avatar.displayName = "Avatar";

export default Avatar;
