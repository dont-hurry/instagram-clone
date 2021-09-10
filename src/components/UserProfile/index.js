import { useState, useEffect } from "react";
import { getPostsByUid } from "../../services/firebase";
import { useParams } from "react-router-dom";
import styles from "./index.module.css";
import Avatar from "../UI/Avatar";
import { Link } from "react-router-dom";
import Posts from "./Posts";
import FollowButton from "./FollowButton";
import Overlay from "./Overlay";

export default function UserProfile({ userInfo }) {
  const {
    uid,
    username,
    fullName,
    followers: initialFollowers,
    following,
  } = userInfo;

  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [followers, setFollowers] = useState(initialFollowers);

  useEffect(() => {
    (async () => {
      const returnedPosts = await getPostsByUid(uid);
      setPosts(returnedPosts);
      setIsLoadingPosts(false);
    })();
  }, [uid]);

  const params = useParams();

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
            <div>
              <span className={styles.userStatisticsNumber}>
                {posts.length}
              </span>{" "}
              posts
            </div>
            <Link to={`/${username}/followers/`}>
              <span className={styles.userStatisticsNumber}>
                {followers.length}
              </span>{" "}
              followers
            </Link>
            <Link to={`/${username}/following/`}>
              <span className={styles.userStatisticsNumber}>
                {following.length}
              </span>{" "}
              following
            </Link>
          </div>
          <div className={styles.fullName}>{fullName}</div>
        </div>
      </div>

      <Posts posts={posts} isLoadingPosts={isLoadingPosts} />

      {params.actionField && (
        <Overlay
          actionField={params.actionField}
          userInfo={userInfo}
          profileUsername={username}
        />
      )}
    </div>
  );
}
