import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import classNames from "classnames";

import styles from "./index.module.scss";

const variants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        stiffness: 1000,
        velocity: -100,
      },
    },
  },
  close: {
    y: 50,
    opacity: 0,
    transition: {
      y: {
        stiffness: 1000,
      },
    },
  },
};

interface Props {
  className?:string;
  children: ReactNode[] | ReactNode;
  onClick?(): void
}

const Item = ({ className, children, onClick }: Props) => {
  return (
    <motion.li
      className={classNames(styles.Option, className)}
      variants={variants}
      whileHover={{ scaleX: 1.003 }}
      whileTap={{ scaleX: 1.005 }}
      onClick={onClick}
    >
      {children}
    </motion.li>
  );
};

Item.displayName = "Select.Item";
export default Item;
