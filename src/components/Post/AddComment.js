import { useContext, useState } from "react";
import { UserContext } from "../../context/user";
import { addComment } from "../../services/firebase";
import styles from "./AddComment.module.css";

export default function AddComment({ postId, addToComments }) {
  const userContext = useContext(UserContext);
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { username } = userContext.userInfo;
    const commentObj = { postId, username, comment };
    await addComment(commentObj);
    addToComments(commentObj);
    setComment("");
  };

  // Make sure `userInfo` is not `null`
  if (!userContext.userInfo) return null;

  let buttonClassName = styles.postButton;
  if (comment) buttonClassName += ` ${styles.postButtonActive}`;

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <input
          placeholder="Add a comment..."
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button className={buttonClassName}>Post</button>
      </form>
    </div>
  );
}
