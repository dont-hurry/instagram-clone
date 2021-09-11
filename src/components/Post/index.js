import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/user";
import { getUserInfoByUid, likePost } from "../../services/firebase";
import styles from "./index.module.css";
import Header from "./Header";
import PostImage from "./PostImage";
import Actions from "./Actions";
import LikeCount from "./LikeCount";
import Caption from "./Caption";
import Comments from "./Comments";
import TimeFromNow from "./TimeFromNow";
import AddComment from "./AddComment";

export default function Post({ post }) {
  const { uid } = useContext(UserContext);

  const {
    caption,
    comments,
    dateCreated,
    imagePath,
    likes: postLikes,
    postId,
    uid: postUid,
  } = post;

  const [postUsername, setPostUsername] = useState("");
  const [likes, setLikes] = useState(postLikes);
  // To make newly added comments always visible
  const [newComments, setNewComments] = useState([]);

  useEffect(() => {
    (async () => {
      const { username: returnedUsername } = await getUserInfoByUid(postUid);
      setPostUsername(returnedUsername);
    })();
  }, [postUid]);

  const handleLike = () => {
    if (!likes.includes(uid)) {
      likePost(uid, postId);
      setLikes((prevState) => prevState.concat(uid));
    }
  };

  const addToComments = ({ username, comment }) => {
    setNewComments((prevState) => prevState.concat({ username, comment }));
  };

  return (
    <div className={styles.container}>
      <Header username={postUsername} />

      <PostImage imagePath={imagePath} handleLike={handleLike} />

      <div className={styles.bodyWrapper}>
        <Actions uid={uid} likes={likes} postId={postId} setLikes={setLikes} />
        <LikeCount count={likes.length} />
        <Caption username={postUsername} caption={caption} />
        <Comments
          comments={comments}
          newComments={newComments}
          postId={postId}
        />
        <TimeFromNow dateCreated={dateCreated} />
        <AddComment postId={postId} addToComments={addToComments} />
      </div>
    </div>
  );
}
