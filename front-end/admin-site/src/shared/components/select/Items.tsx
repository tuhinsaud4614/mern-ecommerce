import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import classNames from "classnames";

import styles from "./index.module.scss";

const variants: Variants = {
  initial: {
    height: "0",
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0),0px 4px 5px 0px rgba(0, 0, 0, 0), 0px 1px 10px 0px rgba(0, 0, 0, 0)",
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
  animate: {
    height: "auto",
    boxShadow:
      "0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
};

interface Props {
  className?:string;
  children: ReactNode[] | ReactNode;
}

const Items = ({ className,children }: Props) => {
  return (
    <motion.ul
      className={classNames(styles.Options, className)}
      variants={variants}
      initial="initial"
      animate="animate"
      style={{ maxHeight: "220px" }}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </motion.ul>
  );
};

Items.displayName = "Select.Items";
export default Items;
