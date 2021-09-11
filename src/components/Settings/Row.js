import styles from "./Row.module.css";

export default function Row({ children }) {
  return <div className={styles.container}>{children}</div>;
}
