import { useState } from "react";
import { followUser, unfollowUser } from "../../services/firebase";
import { Link } from "react-router-dom";
import Avatar from "../UI/Avatar";
import styles from "./SuggestedUser.module.css";
import * as ROUTES from "../../constants/routes";

export default function SuggestedUser({ fullName, username, uid, profileUid }) {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = async () => {
    await followUser(uid, profileUid);
    setIsFollowed(true);
  };

  const handleUnfollow = async () => {
    await unfollowUser(uid, profileUid);
    setIsFollowed(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Avatar username={username} className={styles.avatar} />
        <div className={styles.textContainer}>
          <Link to={ROUTES.PROFILE(username)}>{username}</Link>
          {fullName}
        </div>
      </div>

      {!isFollowed && (
        <div className={styles.follow} onClick={handleFollow}>
          Follow
        </div>
      )}

      {isFollowed && (
        <div className={styles.unfollow} onClick={handleUnfollow}>
          Following
        </div>
      )}
    </div>
  );
}
