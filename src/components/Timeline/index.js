import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/user";
import { getFollowingPosts } from "../../services/firebase";
import styles from "./index.module.css";
import Post from "../Post";

export default function Timeline() {
  const userContext = useContext(UserContext);

  // The home page ensures that `uid` won't be `null`, but it takes some time to
  // retrieve `useInfo` from Firestore, so we have to check it.
  const { uid } = userContext;
  const following = userContext.userInfo?.following;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      if (!following) return;

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
