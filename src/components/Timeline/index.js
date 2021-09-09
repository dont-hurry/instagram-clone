import { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user";
import { getFollowingPosts } from "../../services/firebase";
import styles from "./index.module.css";
import Post from "../Post";

export default function Timeline() {
  const userContext = useContext(UserContext);
  const { uid } = userContext;
  const following = userContext.userInfo
    ? userContext.userInfo.following
    : null;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      if (uid && following) {
        const returnedPosts = await getFollowingPosts({ uid, following });
        setPosts(returnedPosts);
      }
    })();
  }, [uid, following]);

  return (
    <div className={styles.container}>
      {posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  );
}
