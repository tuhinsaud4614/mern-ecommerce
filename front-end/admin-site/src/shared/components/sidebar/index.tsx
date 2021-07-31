import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  FiBox,
  FiChevronRight,
  FiGift,
  FiGrid,
  FiList,
  FiUsers,
} from "react-icons/fi";

import { useAppDispatch, useAppSelector } from "../../../store";
import { toggleSubItems } from "../../../store/features/settings/settingsSlice";
import routes from "../../../routes";
import ThemeSwitch from "../theme-switch";
import styles from "./index.module.scss";
import SubItems, { SubItem } from "./SubItems";

interface ItemProps {
  to: string;
  icon: IconType;
  name: string;
}
const Item = ({ icon: Icon, to, name }: ItemProps) => {
  return (
    <li className={styles.NavItem}>
      <NavLink activeClassName={styles.LinkActive} to={to} exact>
        <Icon />
        <span>{name}</span>
      </NavLink>
    </li>
  );
};

const AnimatedIcon = ({ animated = false }: { animated: boolean }) => (
  <motion.i
    initial={{ rotate: "0deg" }}
    animate={animated ? { rotate: "90deg" } : { rotate: "0deg" }}
  >
    <FiChevronRight />
  </motion.i>
);

const Sidebar = () => {
  const rdxDispatch = useAppDispatch();
  const { open, subItemsOpen } = useAppSelector(
    (state) => state.settings.sidebar
  );

  return (
    <AnimatePresence exitBeforeEnter>
      {open && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: "0" }}
          transition={{ bounce: 0, type: "spring" }}
          className={styles.Root}
        >
          <div className={styles.Head}>
            <h1>Admin Panel</h1>
            <ThemeSwitch />
          </div>
          <nav className={styles.Nav}>
            <ul className={styles.NavItems}>
              <Item icon={FiGrid} name="Dashboard" to={routes.dashboard.path} />
              <li className={styles.NavItem}>
                <span onClick={() => rdxDispatch(toggleSubItems("category"))}>
                  <FiList />
                  <span>Categories</span>
                  <AnimatedIcon animated={subItemsOpen.includes("category")} />
                </span>
                <SubItems animated={subItemsOpen.includes("category")}>
                  <SubItem name="Add Category" to={routes.category.path} />
                  <SubItem name="Add Sub Category" to={routes.subCategory.path} />
                </SubItems>
              </li>
              <li className={styles.NavItem}>
                <span onClick={() => rdxDispatch(toggleSubItems("products"))}>
                  <FiGift />
                  <span>Products</span>
                  <AnimatedIcon animated={subItemsOpen.includes("products")} />
                </span>
                <SubItems animated={subItemsOpen.includes("products")}>
                  <SubItem name="All Products" to={routes.product.path} />
                  <SubItem name="Add Product" to={routes.addProduct.path} />
                </SubItems>
              </li>
              <Item icon={FiBox} name="Orders" to={routes.order.path} />
              <Item
                icon={FiUsers}
                name="Customers"
                to={routes.customer.path}
              />
            </ul>
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

Sidebar.displayName = "Sidebar";

export default Sidebar;
