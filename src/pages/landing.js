import { useState, useEffect } from "react";
import { handleLogIn } from "../services/firebase";
import { getErrorMessageByCode } from "../helpers/error-code";
import styles from "./page-base.module.css";
import BorderedWrapper from "../components/ui/BorderedWrapper";
import Input from "../components/ui/Input";
import SubmitButton from "../components/ui/SubmitButton";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false); // Controls the submit button

  const isFormValid = email && password.length >= 6;

  useEffect(() => (document.title = "Login - Instagram"), []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsWaitingResponse(true);

    try {
      await handleLogIn({ email, password });
    } catch (error) {
      const errorMessage = getErrorMessageByCode(error.code);
      setErrorMessage(errorMessage);
    }

    setIsWaitingResponse(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.twoColumnsLandingPage}>
        <div
          className={styles.screenshotTransition}
          // We don't put these style rules into module CSS because some issues
          // with bundling
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
            <form className={styles.formWrapper} onSubmit={handleSubmit}>
              <div className={styles.inputsWrapper}>
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
              </div>
              <SubmitButton disabled={isWaitingResponse || !isFormValid}>
                Log in
              </SubmitButton>
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
