import { useRef, useContext, useEffect, useState } from "react";
import UserContext from "../../context/user";
import { getPostByPostId } from "../../services/firebase";
import NavigationLayout from "../layout/navigation";
import styles from "./index.module.css";
import AuthorContainer from "./AuthorContainer";
import Comments from "./Comments";
import Actions from "./Actions";
import LikeCount from "./LikeCount";
import TimeFromNow from "./TimeFromNow";
import AddComment from "./AddComment";

export default function SinglePost() {
  const commentsContainerRef = useRef();

  const {
    uid,
    userInfo: { username },
  } = useContext(UserContext);

  useEffect(() => {
    if (username) document.title = `@${username} on Instagram`;
  }, [username]);

  const [post, setPost] = useState();
  const postId = window.location.pathname.split("/p/")[1].replace("/", "");

  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    (async () => {
      const returnedPost = await getPostByPostId(postId);
      setPost(returnedPost);
      setComments(returnedPost.comments);
      setLikes(returnedPost.likes);
    })();
  }, [postId]);

  const addToComments = ({ username, comment }) => {
    setComments((prevState) => prevState.concat({ username, comment }));
  };

  const scrollCommentsContainerToBottom = () => {
    const container = commentsContainerRef.current;
    container.scrollTo(0, container.scrollHeight);
  };

  return (
    <NavigationLayout username={username}>
      {post && (
        <div className={styles.outerContainer}>
          <div className={styles.innerContainer}>
            <img
              src={`/images/posts/${post.imagePath}`}
              alt=""
              className={styles.image}
            />

            <div className={styles.textContainer}>
              <AuthorContainer username={username} />
              <Comments
                ref={commentsContainerRef}
                username={username}
                caption={post.caption}
                comments={comments}
              />

              <div className={styles.actionsAndInfoContainer}>
                <Actions
                  uid={uid}
                  likes={likes}
                  postId={postId}
                  setLikes={setLikes}
                />
                <LikeCount count={likes.length} />
                <TimeFromNow dateCreated={post.dateCreated} />
              </div>
              <AddComment
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
