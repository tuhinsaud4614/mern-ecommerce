import { useEffect, useState } from "react";

type TMode = "dark" | "light";

const useTheme = () => {
  const [theme, setTheme] = useState<TMode>(() => {
    const temp = localStorage.getItem("theme");
    try {
      return (temp && (JSON.parse(temp) as TMode)) || "light";
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
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
