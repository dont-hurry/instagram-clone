import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user";
import { getPostByPostId } from "../../services/firebase";
import NavigationLayout from "../layout/navigation";
import styles from "./index.module.css";

export default function SinglePost() {
  const {
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

            <div>
              <div>USERNAME: {username}</div>
              <div>CAPTION: {post.caption}</div>
              <div>LIKES: {post.likes.length}</div>
              <div>DATE: {post.dateCreated}</div>
              <div>
                {post.comments.map((comment, index) => (
                  <div key={index}>{JSON.stringify(comment)}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </NavigationLayout>
  );
}
