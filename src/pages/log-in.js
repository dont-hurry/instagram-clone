import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { handleLogIn } from "../services/firebase";
import { getErrorMessageByCode } from "../helpers/error-code";
import styles from "./page-base.module.css";
import BorderedWrapper from "../components/UI/BorderedWrapper";
import Input from "../components/UI/Input";
import SubmitButton from "../components/UI/SubmitButton";
import * as ROUTES from "../constants/routes";
import LoginTips from "../components/LoginTips";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false); // Controls the submit button

  const isFormValid = email && password.length >= 6;

  const history = useHistory();

  useEffect(() => (document.title = "Login - Instagram"), []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsWaitingResponse(true);

    try {
      await handleLogIn({ email, password });
      history.push("/");
    } catch (error) {
      const errorMessage = getErrorMessageByCode(error.code);
      setErrorMessage(errorMessage);
    }

    setIsWaitingResponse(false);
  };

  return (
    <div className={styles.page}>
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

      <LoginTips />
    </div>
  );
}
