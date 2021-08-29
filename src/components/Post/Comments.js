import styles from "./Comments.module.css";

function Comment({ comment: { username, comment } }) {
  return (
    <div>
      <span className={styles.username}>{username}</span>{" "}
      <span className={styles.comment}>{comment}</span>
    </div>
  );
}

export default function Comments({ comments }) {
  return (
    <div className={styles.container}>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}
