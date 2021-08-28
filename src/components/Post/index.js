import Header from "./Header";
import Actions from "./Actions";
import Comments from "./Comments";
import styles from "./Post.module.css";

export default function Post({
  post: { uid, imagePath, likes, caption, comments, dateCreated },
}) {
  return (
    <div className={styles.container}>
      <Header uid={uid} />
      <img
        src={`/images/posts/${imagePath}`}
        alt=""
        className={styles.postImage}
      />
      {/* TODO: Caption */}
      <Actions likes={likes} />
      <Comments comments={comments} />
    </div>
  );
}
