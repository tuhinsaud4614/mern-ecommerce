import { ComponentPropsWithRef } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

const Item = ({children, ...rest}:ComponentPropsWithRef<"li">) => {
    return <li className={classNames(styles.Item)} {...rest}>{children}</li>
}

Item.displayName = 'Dropdown.Item';

export default Item;

