import styles from "./base.module.css";
import { handleSignOut } from "../../services/firebase";

export default function Menu() {
  return (
    <div className={styles.menu}>
      <div
        className={styles.menuItem}
        role="button"
        onClick={() => handleSignOut()}
      >
        Log Out
      </div>
    </div>
  );
}
