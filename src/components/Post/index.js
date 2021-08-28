import { useState, useEffect } from "react";
import { getUserInfoByUid } from "../../services/firebase";
import Header from "./Header";
import Actions from "./Actions";
import Like from "./Like";
import Comments from "./Comments";
import styles from "./Post.module.css";

export default function Post({
  post: { uid, imagePath, likes, caption, comments, dateCreated },
}) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      const { username: returnedUsername } = await getUserInfoByUid(uid);
      setUsername(returnedUsername);
    })();
  }, [uid]);

  return (
    <div className={styles.container}>
      <Header username={username} />
      <img
        src={`/images/posts/${imagePath}`}
        alt=""
        className={styles.postImage}
      />
      <div className={styles.bodyWrapper}>
        <Actions uid={uid} likes={likes} />
        <Like likeCount={likes.length} />
        <div>
          <span className={styles.captionUsername}>{username}</span>{" "}
          <span className={styles.captionContent}>{caption}</span>
        </div>
        <Comments comments={comments} />
      </div>
    </div>
  );
}
