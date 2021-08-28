import styles from "./Like.module.css";

export default function Like({ likeCount }) {
  if (likeCount === 0) {
    return <div>like</div>;
  }

  return (
    <div className={styles.likeCount}>
      {likeCount} {likeCount > 1 ? "likes" : "like"}
    </div>
  );
}
