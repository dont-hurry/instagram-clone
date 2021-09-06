import styles from "./Comments.module.css";
import ListItem from "./ListItem";

export default function Comments({ username, caption, comments }) {
  return (
    <div className={styles.container}>
      <ListItem username={username} content={caption} />
      {comments.map((comment, index) => (
        <ListItem
          key={index}
          username={comment.username}
          content={comment.comment}
        />
      ))}
    </div>
  );
}
