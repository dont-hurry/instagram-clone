import { useState, useEffect, useContext, useRef } from "react";
import {
  getPostByPostId,
  getUserInfoByUid,
  likePost,
} from "../../services/firebase";
import UserContext from "../../context/user";
import { useHistory } from "react-router";
import * as ROUTES from "../../constants/routes";
import NavigationLayout from "../layout/navigation";
import styles from "./index.module.css";
import AuthorContainer from "./AuthorContainer";
import Comments from "./Comments";
import Actions from "./Actions";
import LikeCount from "./LikeCount";
import TimeFromNow from "./TimeFromNow";
import AddComment from "./AddComment";

export default function SinglePost() {
  const [post, setPost] = useState(null);
  const postId = window.location.pathname.split("/p/")[1].replace("/", "");
  const [postUsername, setPostUsername] = useState(null);

  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    (async () => {
      const returnedPost = await getPostByPostId(postId);
      setPost(returnedPost);
      setComments(returnedPost.comments);
      setLikes(returnedPost.likes);

      const { username: returnedUsername } = await getUserInfoByUid(
        returnedPost.uid
      );
      setPostUsername(returnedUsername);
    })();
  }, [postId]);

  const userContext = useContext(UserContext);
  const { uid } = userContext;
  const username = userContext.userInfo ? userContext.userInfo.username : null;

  const commentsContainerRef = useRef();
  const addCommentInputRef = useRef();
  const history = useHistory();

  const handleLike = () => {
    // Cannot like a post if the user is not logged in
    if (!uid) return;

    if (!likes.includes(uid)) {
      likePost(uid, postId);
      setLikes((prevState) => prevState.concat(uid));
    }
  };

  const focusAddCommentInput = () => {
    if (addCommentInputRef.current) {
      addCommentInputRef.current.focus();
    } else {
      history.push(ROUTES.LOG_IN);
    }
  };

  const addToComments = ({ username, comment }) => {
    setComments((prevState) => prevState.concat({ username, comment }));
  };

  const scrollCommentsContainerToBottom = () => {
    const container = commentsContainerRef.current;
    container.scrollTo(0, container.scrollHeight);
  };

  useEffect(() => {
    if (postUsername) document.title = `@${postUsername} on Instagram`;
  }, [postUsername]);

  return (
    <NavigationLayout username={username}>
      {post && (
        <div className={styles.outerContainer}>
          <div className={styles.innerContainer}>
            <div className={styles.imageWrapper}>
              <img
                src={`/images/posts/${post.imagePath}`}
                alt=""
                className={styles.image}
                onDoubleClick={handleLike}
              />
            </div>

            <div className={styles.textContainer}>
              <AuthorContainer username={postUsername} />

              <Comments
                ref={commentsContainerRef}
                postUsername={postUsername}
                caption={post.caption}
                comments={comments}
              />

              <div className={styles.actionsAndInfoContainer}>
                <Actions
                  uid={uid}
                  likes={likes}
                  postId={postId}
                  setLikes={setLikes}
                  focusAddCommentInput={focusAddCommentInput}
                />
                <LikeCount count={likes.length} />
                <TimeFromNow dateCreated={post.dateCreated} />
              </div>

              <AddComment
                ref={addCommentInputRef}
                postId={postId}
                username={username}
                addToComments={addToComments}
                scrollCommentsContainerToBottom={
                  scrollCommentsContainerToBottom
                }
              />
            </div>
          </div>
        </div>
      )}
    </NavigationLayout>
  );
}
