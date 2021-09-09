import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2>Sorry, this page isn't available</h2>
      <div className={styles.textWrapper}>
        The link you followed may be broken, or the page may have been removed.{" "}
        <Link to="/">Go back to Instagram.</Link>
      </div>
    </div>
  );
}
