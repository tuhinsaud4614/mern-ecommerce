import { ComponentPropsWithRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiBell, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

import routes from "../../../routes";
import Avatar from "../avatar";
import Dropdown from "../dropdown";
import Badge from "../ui/badge";
import Logo from "../logo";
import { IconButton } from "../ui/button";
import styles from "./index.module.scss";

const initial = { rotate: "0deg", x: 0, y: 0 };

const Header = ({
  className,
  ref,
  ...rest
}: ComponentPropsWithRef<"header">) => {
  const [open, setOpen] = useState<boolean>(false);
  const [ele, setEle] = useState<HTMLElement | null>(null);
  const { push } = useHistory();

  return createPortal(
    <header className={classNames(styles.Root, className)} ref={ref} {...rest}>
      <button
        type="button"
        className={styles.MenuIcon}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <motion.span
          initial={initial}
          animate={open ? { rotate: "45deg", x: 0, y: 6 } : initial}
        />
        <span style={{ opacity: open ? 0 : 1 }} />
        <motion.span
          initial={initial}
          animate={open ? { rotate: "-45deg", x: 0, y: -6 } : initial}
        />
      </button>
      <Logo
        onClick={() => {
          push(routes.dashboard.path);
        }}
      />

      <nav className={styles.Nav}>
        <ul className={styles.NavItems}>
          <li className={styles.NavItem}>
            <IconButton>
              <FiSearch />
            </IconButton>
          </li>
          <li className={styles.NavItem}>
            <Badge
              max={99}
              useFor={
                <IconButton>
                  <FiBell />
                </IconButton>
              }
            >
              100
            </Badge>
          </li>
          <li className={styles.NavItem}>
            <Avatar
              style={{ cursor: "pointer" }}
              src="https://images.unsplash.com/photo-1624877815516-9cc0ecea541a"
              onClick={(e) => setEle(e.currentTarget)}
            >
              H
            </Avatar>
            <Dropdown
              open={Boolean(ele)}
              relativeElement={ele}
              onClose={() => setEle(null)}
            >
                <Dropdown.Item>li</Dropdown.Item>
                <Dropdown.Item>li2</Dropdown.Item>
            </Dropdown>
          </li>
          {/* <li className="header-nav__item">
            <a href="javascript: void(0)" className="p-0" id="admin-avatar-btn">
              <img className="avatar" src="./img/user.jpg" alt="User" />
            </a>
            <div className="header-nav__item-dropdown d-sh">
              <a href="#" className="link-btn-normal">
                Edit Profile
              </a>
              <a href="#" className="link-btn-normal">
                Logout
              </a>
            </div>
          </li> */}
        </ul>
      </nav>
    </header>,
    document.getElementById("main-header") as HTMLDivElement
  );
};

Header.displayName = "Header";

export default Header;
