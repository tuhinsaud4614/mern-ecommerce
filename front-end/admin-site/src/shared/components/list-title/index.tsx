import { Children, ComponentPropsWithRef } from "react";
import classNames from "classnames";

import { splitJSXChild } from "../../utils";
import Leading from "./Leading";
import Subtitle from "./Subtitle";
import Title from "./Title";
import Tailing from "./Tailing";
import styles from "./index.module.scss";

interface Props extends ComponentPropsWithRef<"div"> {
  classes?: {
    content?: string;
  };
}
const ListTileComponent = ({
  classes,
  className,
  children,
  ...rest
}: Props) => {
  let leading: any = null;
  let title: any = null;
  let subtitle: any = null;
  let tailing: any = null;

  Children.forEach(children, (child) => {
    if (splitJSXChild(child, Leading)) {
      leading = splitJSXChild(child, Leading);
    } else if (splitJSXChild(child, Title)) {
      title = splitJSXChild(child, Title);
    } else if (splitJSXChild(child, Subtitle)) {
      subtitle = splitJSXChild(child, Subtitle);
    } else if (splitJSXChild(child, Tailing)) {
      tailing = splitJSXChild(child, Tailing);
    }
  });

  return (
    <div className={classNames(styles.Root, className)} {...rest}>
      {leading}
      {(title || subtitle) && (
        <div className={classNames(styles.Content, classes?.content)}>
          {title}
          {subtitle}
        </div>
      )}
      {tailing}
    </div>
  );
};

ListTileComponent.displayName = "ListTile";
const ListTile = Object.assign(ListTileComponent, {
  Leading: Leading,
  Subtitle: Subtitle,
  Title: Title,
  Tailing: Tailing,
});

export default ListTile;
