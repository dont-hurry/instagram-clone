import styles from "./ListItem.module.css";
import Avatar from "../UI/Avatar";

export default function ListItem({ username, content }) {
  return (
    <div className={styles.container}>
      <Avatar username={username} className={styles.avatar} />
      <div className={styles.textWrapper}>
        <span className={styles.username}>{username}</span>{" "}
        <span className={styles.content}>{content}</span>
      </div>
    </div>
  );
}
