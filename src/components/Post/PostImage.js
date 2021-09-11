import styles from "./PostImage.module.css";

export default function PostImage({ imagePath, handleLike }) {
  return (
    <img
      src={`/images/posts/${imagePath}`}
      alt=""
      className={styles.postImage}
      onDoubleClick={handleLike}
    />
  );
}
