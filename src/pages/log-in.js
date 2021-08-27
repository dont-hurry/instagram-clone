import { useState, useEffect } from "react";
import BorderedWrapper from "../components/ui/BorderedWrapper";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import styles from "./base.module.css";

export default function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = username && password.length >= 6;

  useEffect(() => (document.title = "Login - Instagram"), []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <BorderedWrapper>
          <h1>
            <img src="/images/logo.png" alt="" />
          </h1>
          <form onSubmit={handleSubmit}>
            <Input
              aria-label="Username"
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              type="text"
              value={username}
            />
            <Input
              aria-label="Password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type="password"
              value={password}
            />
            <Button disabled={!isFormValid}>Log in</Button>
          </form>
        </BorderedWrapper>

        <BorderedWrapper>
          <span className={styles.textSmall}>
            Don't have an account? Sign up
          </span>
        </BorderedWrapper>
      </div>
    </div>
  );
}
