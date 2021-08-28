import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { handleLogIn } from "../services/firebase";

import BorderedWrapper from "../components/ui/BorderedWrapper";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import styles from "./PagesBase.module.css";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);
  // Controls the submit button
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const isFormValid = email && password.length >= 6;

  useEffect(() => (document.title = "Login - Instagram"), []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setWaitingForResponse(true);

    try {
      await handleLogIn({ email, password });
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setErrorMessage("Enter a valid email address.");
          break;
        case "auth/user-not-found":
          setErrorMessage(
            "The username you entered doesn't belong to an account. Please check your username and try again."
          );
          break;
        case "auth/wrong-password":
          setErrorMessage(
            "Sorry, your password was incorrect. Please double-check your password."
          );
          break;
        default:
          setErrorMessage("Unknown error.");
      }
    }

    setWaitingForResponse(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.twoColumn}>
        <div
          className={styles.screenshotTransition}
          style={{
            backgroundImage: "url(/images/mobile.png)",
            backgroundSize: "454px 618px",
          }}
        >
          <img src="/images/screenshot-1.jpeg" alt="" />
          <img src="/images/screenshot-2.jpeg" alt="" />
          <img src="/images/screenshot-3.jpeg" alt="" />
          <img src="/images/screenshot-4.jpeg" alt="" />
          <img src="/images/screenshot-5.jpeg" alt="" />
        </div>

        <div className={styles.container}>
          <BorderedWrapper>
            <h1>
              <img src="/images/logo.png" alt="" />
            </h1>
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
                Log in
              </Button>
              {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
              )}
            </form>
          </BorderedWrapper>

          <BorderedWrapper>
            <span className={styles.textSmall}>
              Don't have an account?{" "}
              <Link to={ROUTES.SIGN_UP} className={styles.link}>
                Sign up
              </Link>
            </span>
          </BorderedWrapper>
        </div>
      </div>
    </div>
  );
}
