import { useState, useEffect } from "react";
import { getUserInfoByUid } from "../../services/firebase";
import styles from "./Post.module.css";
import Header from "./Header";
import Actions from "./Actions";
import LikeCount from "./LikeCount";
import Caption from "./Caption";
import Comments from "./Comments";
import TimeFromNow from "./TimeFromNow";
import AddComment from "./AddComment";

function PostImage({ imagePath }) {
  return (
    <img
      src={`/images/posts/${imagePath}`}
      alt=""
      className={styles.postImage}
    />
  );
}

export default function Post({ post }) {
  const {
    postId,
    uid,
    imagePath,
    likes,
    caption,
    comments: postComments,
    dateCreated,
  } = post;

  const [username, setUsername] = useState("");
  const [comments, setComments] = useState(postComments);

  const addToComments = ({ username, comment }) => {
    setComments((prevState) => [...prevState, { username, comment }]);
  };

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
        <TimeFromNow dateCreated={dateCreated} />
        <AddComment
          postId={postId}
          username={username}
          addToComments={addToComments}
        />
      </div>
    </div>
  );
}
