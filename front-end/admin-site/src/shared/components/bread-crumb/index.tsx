import { ComponentPropsWithoutRef, Fragment, ReactElement } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";
import classNames from "classnames";

import styles from "./index.module.scss";
const Item = ({
  activeClassName,
  className,
  children,
  ...rest
}: NavLinkProps) => {
  return (
    <NavLink
      activeClassName={classNames(styles.Active, activeClassName)}
      className={classNames(styles.Link, className)}
      {...rest}
    >
      {children}
    </NavLink>
  );
};

interface Props extends ComponentPropsWithoutRef<"nav"> {
  children?: ReactElement<NavLinkProps> | ReactElement<NavLinkProps>[];
  classes?: {
    breaker?: string;
    items?: string;
    item?: string;
  };
}
const BreadCrumbComponent = ({
  children,
  className,
  classes,
  ...rest
}: Props) => {
  return (
    <nav className={classNames(styles.Root, className)} {...rest}>
      <ol className={classNames(styles.Items, classes?.items)}>
        {children && Array.isArray(children) ? (
          children.map((item, index) => (
            <Fragment key={index}>
              <li className={classNames(classes?.item)}>{item}</li>
              {index + 1 < children.length && (
                <li className={classNames(classes?.breaker)}>/</li>
              )}
            </Fragment>
          ))
        ) : (
          <li className={classNames(classes?.item)}>{children}</li>
        )}
      </ol>
    </nav>
  );
};

BreadCrumbComponent.displayName = "BreadCrumb";
const BreadCrumb = Object.assign(BreadCrumbComponent, {
  Item: Item,
});
export default BreadCrumb;
