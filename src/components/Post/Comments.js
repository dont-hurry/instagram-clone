import styles from "./Comments.module.css";
import { Link } from "react-router-dom";

function ViewAllComments({ postId, count }) {
  return (
    <div>
      <Link to={`/p/${postId}/`} className={styles.viewAllComments}>
        View all {count} comments
      </Link>
    </div>
  );
}

function Comment({ comment: { username, comment } }) {
  return (
    <div>
      <span className={styles.username}>{username}</span>{" "}
      <span className={styles.comment}>{comment}</span>
    </div>
  );
}

export default function Comments({ comments, newComments, postId }) {
  return (
    <div className={styles.container}>
      {comments.length >= 3 && (
        <ViewAllComments
          postId={postId}
          count={comments.length + newComments.length}
        />
      )}

      {/* Retrieve two latest comments */}
      {[...comments.slice(-2), ...newComments].map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
}
