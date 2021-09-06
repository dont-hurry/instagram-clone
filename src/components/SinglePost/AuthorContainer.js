import styles from "./AuthorContainer.module.css";
import Avatar from "../UI/Avatar";

export default function AuthorContainer({ username }) {
  return (
    <div className={styles.container}>
      <Avatar username={username} className={styles.avatar} />
      <span className={styles.username}>{username}</span>
    </div>
  );
}
