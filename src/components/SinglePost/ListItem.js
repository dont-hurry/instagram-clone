import styles from "./ListItem.module.css";
import Avatar from "../UI/Avatar";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export default function ListItem({ username, content }) {
  return (
    <div className={styles.container}>
      <Avatar username={username} className={styles.avatar} />
      <div className={styles.textWrapper}>
        <Link to={ROUTES.PROFILE(username)} className={styles.username}>
          {username}
        </Link>{" "}
        <span className={styles.content}>{content}</span>
      </div>
    </div>
  );
}
