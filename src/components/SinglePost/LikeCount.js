import styles from "./LikeCount.module.css";

export default function LikeCount({ count }) {
  return (
    <div className={styles.container}>
      {count
        ? `${count} ${count > 1 ? "likes" : "like"}`
        : "Be the first to like this"}
    </div>
  );
}
