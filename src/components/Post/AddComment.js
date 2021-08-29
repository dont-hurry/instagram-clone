import { useState } from "react";
import styles from "./AddComment.module.css";

export default function AddComment() {
  const [comment, setComment] = useState();

  return (
    <div className={styles.container}>
      <form className={styles.formWrapper}>
        <input placeholder="Add a comment..." />
        <button>Post</button>
      </form>
    </div>
  );
}
