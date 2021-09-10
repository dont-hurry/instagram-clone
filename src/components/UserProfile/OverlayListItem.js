import { useState, useEffect } from "react";
import { getUserInfoByUid } from "../../services/firebase";
import styles from "./OverlayListItem.module.css";
import Avatar from "../UI/Avatar";
import { Link } from "react-router-dom";

export default function OverlayListItem({ uid }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const returnedUserInfo = await getUserInfoByUid(uid);
      setUserInfo(returnedUserInfo);
    })();
  }, []);

  if (!userInfo) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Link to={`/${userInfo.username}/`}>
        <Avatar username={userInfo.username} className={styles.avatar} />
      </Link>

      <div className={styles.textContainer}>
        <Link to={`/${userInfo.username}/`}>{userInfo.username}</Link>
        <span>{userInfo.fullName}</span>
      </div>
    </div>
  );
}
