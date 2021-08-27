import { useState, useEffect } from "react";
import BorderedWrapper from "../components/ui/BorderedWrapper";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import styles from "./sign-up.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email && fullName && username && password.length >= 6;

  useEffect(() => (document.title = "Sign Up - Instagram"), []);

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
          <h2>Sign up to see photos and videos from your friends.</h2>
          <form onSubmit={handleSubmit}>
            <Input
              aria-label="Email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              type="text"
              value={email}
            />
            <Input
              aria-label="Full Name"
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Full Name"
              type="text"
              value={fullName}
            />
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
            <Button disabled={!isFormValid}>Sign up</Button>
          </form>
        </BorderedWrapper>

        <BorderedWrapper>
          <span className={styles.textSmall}>Have an account? Log in</span>
        </BorderedWrapper>
      </div>
    </div>
  );
}
