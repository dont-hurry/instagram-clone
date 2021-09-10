import { useState, useEffect } from "react";
import { getPostsByUid } from "../../services/firebase";
import styles from "./index.module.css";
import Avatar from "../UI/Avatar";
import Posts from "./Posts";
import FollowButton from "./FollowButton";

export default function UserProfile({
  userInfo: {
    uid,
    username,
    fullName,
    followers: initialFollowers,
    following: initialFollowing,
  },
}) {
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [followers, setFollowers] = useState(initialFollowers);
  const [following, setFollowing] = useState(initialFollowing);

  useEffect(() => {
    (async () => {
      const returnedPosts = await getPostsByUid(uid);
      setPosts(returnedPosts);
      setIsLoadingPosts(false);
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
          <div className={styles.usernameWrapper}>
            <div className={styles.username}>{username}</div>
            <FollowButton
              uid={uid}
              username={username}
              followers={followers}
              setFollowers={setFollowers}
            />
          </div>
          <div className={styles.userStatisticsContainer}>
            {userStatisticsData.map((data) => (
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

      <Posts posts={posts} isLoadingPosts={isLoadingPosts} />
    </div>
  );
}
