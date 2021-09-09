import { forwardRef } from "react";
import styles from "./Comments.module.css";
import ListItem from "./ListItem";

export default forwardRef(function Comments(
  { postUsername, caption, comments },
  ref
) {
  return (
    <div className={styles.container} ref={ref}>
      <ListItem username={postUsername} content={caption} />
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
