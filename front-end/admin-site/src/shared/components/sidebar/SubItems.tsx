import { AnimatePresence, motion } from "framer-motion";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.scss";

interface SubItemProps {
  to: string;
  name: string;
}

export const SubItem = ({ to, name }: SubItemProps) => {
  return (
    <li className={styles.NavSubItem}>
      <NavLink activeClassName={styles.LinkActive} to={to} exact>
        {name}
      </NavLink>
    </li>
  );
};

interface SubItemsProps {
  children?: ReactElement<SubItemProps> | ReactElement<SubItemProps>[];
  animated: boolean;
}
const SubItems = ({ animated, children }: SubItemsProps) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {animated && (
        <motion.ul
          initial={{ height: "0", opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className={styles.NavSubItems}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default SubItems;
