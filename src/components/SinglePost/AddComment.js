import { forwardRef, useState } from "react";
import { addComment } from "../../services/firebase";
import styles from "./AddComment.module.css";

export default forwardRef(function AddComment(
  { postId, username, addToComments, scrollCommentsContainerToBottom },
  ref
) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const commentObj = { postId, username, comment };
    await addComment(commentObj);
    addToComments(commentObj);
    setComment("");

    scrollCommentsContainerToBottom();
  };

  let buttonClassName = styles.postButton;
  if (comment) buttonClassName += ` ${styles.postButtonActive}`;

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <input
          ref={ref}
          placeholder="Add a comment..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button className={buttonClassName}>Post</button>
      </form>
    </div>
  );
});
