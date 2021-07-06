import { useEffect, useState } from "react";

type TMode = "dark" | "light";

const useTheme = () => {
  const [theme, setTheme] = useState<TMode>(
    () => (localStorage.getItem("theme") as TMode) || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      !document.body.classList.contains("dark") &&
        document.body.classList.add("dark");
    } else {
      document.body.classList.contains("dark") &&
        document.body.classList.remove("dark");
    }
  }, [theme]);

  const changeTheme = (mode: TMode) => {
    setTheme(mode);
  };
  return [theme, changeTheme] as const;
};

export default useTheme;
