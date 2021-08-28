import { useState, useEffect } from "react";
import { getFollowingPosts } from "../../services/firebase";
import Post from "../Post";
import styles from "./Timeline.module.css";

export default function Timeline({ uid, following }) {
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
