import styles from "./Menu.module.css";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import ProfileIcon from "../icons/Profile";
import SavedIcon from "../icons/Saved";
import SettingsIcon from "../icons/Settings";
import { handleSignOut } from "../../services/firebase";

export default function Menu({ username }) {
  return (
    <div className={styles.menu}>
      <Link to={ROUTES.PROFILE(username)} className={styles.menuItem}>
        <ProfileIcon />
        Profile
      </Link>
      <Link to={ROUTES.SAVED(username)} className={styles.menuItem}>
        <SavedIcon />
        Saved
      </Link>
      <Link to={ROUTES.SETTINGS} className={styles.menuItem}>
        <SettingsIcon />
        Settings
      </Link>
      <hr />
      <div
        className={styles.menuItem}
        onClick={() => handleSignOut()}
        role="button"
      >
        Log Out
      </div>
    </div>
  );
}
