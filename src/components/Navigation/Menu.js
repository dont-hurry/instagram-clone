import styles from "./Navigation.module.css";
import { handleSignOut } from "../../services/firebase";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import ProfileSvg from "../icons/Profile";
import SavedSvg from "../icons/Saved";
import SettingsSvg from "../icons/Settings";

export default function Menu({ username }) {
  return (
    <div className={styles.menu}>
      <Link to={`/${username}/`} className={styles.menuItem}>
        <ProfileSvg />
        Profile
      </Link>
      <Link to={`/${username}/saved/`} className={styles.menuItem}>
        <SavedSvg />
        Saved
      </Link>
      <Link to={ROUTES.SETTINGS} className={styles.menuItem}>
        <SettingsSvg />
        Settings
      </Link>
      <hr />
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
