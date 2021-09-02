import { useState, useEffect } from "react";
import { getFollowingPosts } from "../../services/firebase";
import styles from "./index.module.css";
import Post from "../Post";

export default function Timeline({ uid, following }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const returnedPosts = await getFollowingPosts({ uid, following });
      setPosts(returnedPosts);
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
