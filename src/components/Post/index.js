import { useState, useEffect } from "react";
import { getUserInfoByUid } from "../../services/firebase";
import styles from "./Post.module.css";
import Header from "./Header";
import Actions from "./Actions";
import LikeCount from "./LikeCount";
import Caption from "./Caption";
import Comments from "./Comments";

function PostImage({ imagePath }) {
  return (
    <img
      src={`/images/posts/${imagePath}`}
      alt=""
      className={styles.postImage}
    />
  );
}

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

      <PostImage imagePath={imagePath} />

      <div className={styles.bodyWrapper}>
        <Actions uid={uid} likes={likes} />
        <LikeCount count={likes.length} />
        <Caption username={username} caption={caption} />
        <Comments comments={comments} />
      </div>
    </div>
  );
}
