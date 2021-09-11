import { useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../context/user";
import { unfollowUser, followUser } from "../../services/firebase";
import styles from "./FollowButton.module.css";

export default function FollowButton({
  uid: profileUid,
  username: profileUsername,
  followers,
  setFollowers,
}) {
  const userContext = useContext(UserContext);
  const history = useHistory();

  if (userContext.userInfo?.username === profileUsername) {
    return null;
  }

  const uid = userContext.userInfo?.uid;

  const handleUnfollow = async () => {
    await unfollowUser(uid, profileUid);
    setFollowers((prevState) =>
      prevState.filter((followerUid) => followerUid !== uid)
    );
  };

  const handleFollow = async () => {
    if (!uid) {
      history.push("/");
      return;
    }

    await followUser(uid, profileUid);
    setFollowers((prevState) => prevState.concat(uid));
  };

  if (followers.includes(uid)) {
    return (
      <button className={styles.unfollowButton} onClick={handleUnfollow}>
        Unfollow
      </button>
    );
  }

  return (
    <button className={styles.followButton} onClick={handleFollow}>
      Follow
    </button>
  );
}
