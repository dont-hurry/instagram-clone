import styles from "./BorderedWrapper.module.css";

export default function BorderedWrapper({ children }) {
  return <div className={styles.borderedWrapper}>{children}</div>;
}
