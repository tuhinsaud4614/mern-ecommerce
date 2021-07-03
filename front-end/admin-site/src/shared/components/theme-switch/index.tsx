import { FiSun } from "react-icons/fi";
import { GiMoon } from "react-icons/gi";
import classNames from "classnames";

import useTheme from "../../hooks/useTheme";
import styles from "./index.module.scss";

const ThemeSwitch = () => {
  const [theme, changeTheme] = useTheme();

  return theme === "dark" ? (
    <FiSun
      className={classNames(styles.root, styles.sun)}
      onClick={() => changeTheme("light")}
    />
  ) : (
    <GiMoon
      className={classNames(styles.root, styles.moon)}
      onClick={() => changeTheme("dark")}
    />
  );
};

ThemeSwitch.displayName = "Theme-Switch";

export default ThemeSwitch;
