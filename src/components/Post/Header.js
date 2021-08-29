import { Link } from "react-router-dom";
import Avatar from "../../components/ui/Avatar";
import styles from "./Header.module.css";
import * as ROUTES from "../../constants/routes";

export default function Header({ username }) {
  return (
    <div className={styles.container}>
      <Avatar username={username} className={styles.avatar} />
      <Link to={ROUTES.PROFILE(username)} className={styles.username}>
        {username}
      </Link>
    </div>
  );
}
