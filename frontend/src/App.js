import { useState, useEffect } from "react";

import LoginPage from "./pages/LoginPage";
import PostsHomePage from "./pages/PostsHomePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticate = () => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
    else setIsAuthenticated(false);
  };

  useEffect(() => {
    authenticate();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <PostsHomePage />
      ) : (
        <LoginPage authenticate={authenticate} />
      )}
    </>
  );
}

export default App;
