import styles from "./Caption.module.css";

export default function Caption({ username, caption }) {
  return (
    <div>
      <span className={styles.username}>{username}</span>{" "}
      <span className={styles.content}>{caption}</span>
    </div>
  );
}
