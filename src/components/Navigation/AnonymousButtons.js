import styles from "./AnonymousButtons.module.css";
import { Link } from "react-router-dom";

export default function AnonymousButtons() {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.loginButton}>
        登入
      </Link>
      <Link to="/" className={styles.signUpButton}>
        註冊
      </Link>
    </div>
  );
}
