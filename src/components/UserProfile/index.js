import { useState, useEffect } from "react";
import { getPostsByUid } from "../../services/firebase";
import styles from "./index.module.css";
import Avatar from "../UI/Avatar";
import Posts from "./Posts";

export default function UserProfile({
  userInfo: { uid, username, fullName, followers, following },
}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const returnedPosts = await getPostsByUid(uid);
      setPosts(returnedPosts);
    })();
  }, [uid]);

  const userStatisticsData = [
    { text: "posts", number: posts.length },
    { text: "followers", number: followers.length },
    { text: "following", number: following.length },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.avatarColumn}>
          <div className={styles.avatarWrapper}>
            <Avatar username={username} />
          </div>
        </div>

        <div className={styles.userInfoColumn}>
          <div className={styles.username}>{username}</div>
          <div className={styles.userStatisticsContainer}>
            {userStatisticsData.map((data, index) => (
              <div key={data.text}>
                <span className={styles.userStatisticsNumber}>
                  {data.number}
                </span>{" "}
                {data.text}
              </div>
            ))}
          </div>
          <div className={styles.fullName}>{fullName}</div>
        </div>
      </div>

      <Posts posts={posts} />
    </div>
  );
}
