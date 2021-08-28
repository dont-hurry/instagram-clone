import { Link } from "react-router-dom";
import Avatar from "../../components/ui/Avatar";
import styles from "./Header.module.css";

export default function Header({ username }) {
  return (
    <div className={styles.container}>
      <Avatar username={username} className={styles.avatar} />
      <Link to={`/${username}/`} className={styles.username}>
        {username}
      </Link>
    </div>
  );
}
