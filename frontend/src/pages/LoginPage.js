import { useState } from "react";

import { login, signup } from "../api/users";

import Timer from "../components/Timer";

const LoginPage = ({ authenticate }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username,
      password,
    };

    try {
      const response = await login(payload);
      if (response.status === 200) {
        const jwt = await response.json();

        if (jwt && typeof jwt === "string") localStorage.setItem("token", jwt);
        else alert(jwt.message);

        authenticate();
      } else alert("there was an error");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const payload = {
      username,
      password,
    };

    try {
      const response = await signup(payload);

      if (response.status === 200) alert("successfully registered");
      else alert("there was an error");

      //reset form
      setUsername("");
      setPassword("");
    } catch (error) {
      alert("there was an error");
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label>username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <label>password</label>
        <input
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button
          style={{ marginTop: "2rem" }}
          type="submit"
          onClick={handleFormSubmit}
        >
          Log in
        </button>

        <button style={{ marginTop: "0.5rem" }} onClick={handleSignup}>
          Sign up
        </button>
        <Timer />
      </form>
    </div>
  );
};

export default LoginPage;
