import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { doesUsernameExist, handleSignUp } from "../services/firebase";
import { getErrorMessageByCode } from "../helpers/error-code";
import styles from "./page-base.module.css";
import BorderedWrapper from "../components/ui/BorderedWrapper";
import Input from "../components/ui/Input";
import SubmitButton from "../components/ui/SubmitButton";
import * as ROUTES from "../constants/routes";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false); // Controls the submit button

  const isFormValid = email && fullName && username && password.length >= 6;

  const history = useHistory();

  useEffect(() => (document.title = "Sign Up - Instagram"), []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsWaitingResponse(true);

    try {
      const usernameExists = await doesUsernameExist(username);

      if (usernameExists) {
        setErrorMessage("A user with that username already exists.");
      } else {
        await handleSignUp({ email, fullName, username, password });
        history.push("/");
      }
    } catch (error) {
      const errorMessage = getErrorMessageByCode(error.code, { email });
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
          <h2>Sign up to see photos and videos from your friends.</h2>
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
            </div>
            <SubmitButton disabled={isWaitingResponse || !isFormValid}>
              Sign up
            </SubmitButton>
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
