import { useEffect, useState } from "react";

type TMode = "dark" | "light";

export const setThemeClass = (theme: TMode) => {
  if (theme === "dark") {
    !document.body.classList.contains("dark") &&
      document.body.classList.add("dark");
  } else {
    document.body.classList.contains("dark") &&
      document.body.classList.remove("dark");
  }
};

export const getThemeFromStorage = (): TMode => {
  try {
    const theme = localStorage.getItem("theme");
    return (theme && (JSON.parse(theme) as TMode)) || "light";
  } catch (e) {
    return "light";
  }
};

const useTheme = () => {
  const [theme, setTheme] = useState<TMode>(getThemeFromStorage);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
    setThemeClass(theme);
  }, [theme]);

  const changeTheme = (mode: TMode) => {
    setTheme(mode);
  };
  return [theme, changeTheme] as const;
};

export default useTheme;
