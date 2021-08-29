import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import styles from "./SuggestedUser.module.css";
import * as ROUTES from "../../constants/routes";

export default function SuggestedUser({ fullName, username }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Avatar username={username} className={styles.avatar} />
        <div className={styles.textContainer}>
          <Link to={ROUTES.PROFILE(username)}>{username}</Link>
          {fullName}
        </div>
      </div>

      <div className={styles.follow}>Follow</div>
    </div>
  );
}
