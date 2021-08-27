import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist, handleSignUp } from "../services/firebase";

import BorderedWrapper from "../components/ui/BorderedWrapper";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import styles from "./base.module.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  // Controls the submit button
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const isFormValid = email && fullName && username && password.length >= 6;

  useEffect(() => (document.title = "Sign Up - Instagram"), []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setWaitingForResponse(true);

    try {
      const usernameExists = await doesUsernameExist(username);

      if (usernameExists) {
        setErrorMessage("A user with that username already exists.");
      } else {
        await handleSignUp({ email, fullName, username, password });
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage(`Another account is using ${email}.`);
      } else {
        setErrorMessage("Unknown error.");
      }
    }

    setWaitingForResponse(false);
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
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage(null);
              }}
              placeholder="Email"
              type="text"
              value={email}
            />
            <Input
              aria-label="Full Name"
              onChange={(event) => {
                setFullName(event.target.value);
                setErrorMessage(null);
              }}
              placeholder="Full Name"
              type="text"
              value={fullName}
            />
            <Input
              aria-label="Username"
              onChange={(event) => {
                setUsername(event.target.value);
                setErrorMessage(null);
              }}
              placeholder="Username"
              type="text"
              value={username}
            />
            <Input
              aria-label="Password"
              onChange={(event) => {
                setPassword(event.target.value);
                setErrorMessage(null);
              }}
              placeholder="Password"
              type="password"
              value={password}
            />
            <Button disabled={waitingForResponse || !isFormValid}>
              Sign up
            </Button>
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
          </form>
        </BorderedWrapper>

        <BorderedWrapper>
          <span className={styles.textSmall}>
            Have an account?{" "}
            <Link to={ROUTES.LOG_IN} className={styles.link}>
              Log in
            </Link>
          </span>
        </BorderedWrapper>
      </div>
    </div>
  );
}
