import styles from "./Navigation.module.css";
import { handleSignOut } from "../../services/firebase";
import { Link } from "react-router-dom";
import ProfileSvg from "../svgs/Profile";

export default function Menu({ username }) {
  return (
    <div className={styles.menu}>
      <Link to={`/${username}/`} className={styles.menuItem}>
        <ProfileSvg />
        Profile
      </Link>
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
