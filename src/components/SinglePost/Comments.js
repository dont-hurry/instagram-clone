import { forwardRef } from "react";
import styles from "./Comments.module.css";
import ListItem from "./ListItem";

export default forwardRef(function Comments(
  { username, caption, comments },
  ref
) {
  return (
    <div className={styles.container} ref={ref}>
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
});
