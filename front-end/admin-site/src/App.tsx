import { useEffect, useState } from "react";
import { BiFile } from "react-icons/bi";

import Button, { IconButton } from "./shared/components/ui/button";
import "./App.scss";

function App() {
  const [dark, setDark] = useState<boolean>(false);

  useEffect(() => {
    if (dark) {
      !document.body.classList.contains("dark") &&
        document.body.classList.add("dark");
    } else {
      document.body.classList.contains("dark") &&
        document.body.classList.remove("dark");
    }
  }, [dark]);
  return (
    <div className="App">
      <Button
        startIcon={<BiFile />}
        endIcon={<BiFile />}
        variant="danger"
        onClick={() => setDark((prev) => !prev)}
        pending
      >
        button
      </Button>
      <IconButton
        style={{ marginLeft: "8px" }}
        variant="success"
        onClick={() => setDark((prev) => !prev)}
        pending
      >
        <BiFile />
      </IconButton>
    </div>
  );
}

export default App;
