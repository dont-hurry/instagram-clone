import styles from "./Message.module.css";

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return <div className={styles.container}>{message}</div>;
}
