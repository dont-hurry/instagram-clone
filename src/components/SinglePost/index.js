import { useContext, useEffect, useState } from "react";
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
  const {
    uid,
    userInfo: { username },
  } = useContext(UserContext);

  useEffect(() => {
    if (username) document.title = `@${username} on Instagram`;
  }, [username]);

  const [post, setPost] = useState();
  const postId = window.location.pathname.split("/p/")[1].replace("/", "");

  useEffect(() => {
    (async () => {
      const returnedPost = await getPostByPostId(postId);
      setPost(returnedPost);
    })();
  }, [postId]);

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
                username={username}
                caption={post.caption}
                comments={post.comments}
              />

              <div className={styles.actionsAndInfoContainer}>
                <Actions uid={uid} likes={post.likes} />
                <LikeCount count={post.likes.length} />
                <TimeFromNow dateCreated={post.dateCreated} />
              </div>
              <AddComment />
            </div>
          </div>
        </div>
      )}
    </NavigationLayout>
  );
}
