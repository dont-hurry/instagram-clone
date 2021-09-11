import { useState } from "react";
import { followUser, unfollowUser } from "../../services/firebase";
import styles from "./SuggestedUsersItem.module.css";
import Avatar from "../UI/Avatar";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export default function SuggestedUsersItem({
  fullName,
  username,
  suggestedUserUid,
  currentUserUid,
}) {
  const [isFollowed, setIsFollowed] = useState(false);

  const handleFollow = async () => {
    await followUser(currentUserUid, suggestedUserUid);
    setIsFollowed(true);
  };

  const handleUnfollow = async () => {
    await unfollowUser(currentUserUid, suggestedUserUid);
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
