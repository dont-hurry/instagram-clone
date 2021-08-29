import styles from "./LikeCount.module.css";

export default function LikeCount({ count }) {
  if (count === 0) {
    return <div>Be the first to like this</div>;
  }

  return (
    <div className={styles.likeCount}>
      {count} {count > 1 ? "likes" : "like"}
    </div>
  );
}
