import { useEffect } from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import { Router } from "./router/routing";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const user = Cookies.get("tokenShine2023");
  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/auth/form");
    }
  }, []);
  const routing = useRoutes(Router);
  return <div className="App">{routing}</div>;
}

export default App;
