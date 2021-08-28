import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserInfoByUid } from "../../services/firebase";
import Avatar from "../../components/ui/Avatar";
import styles from "./Header.module.css";

export default function Header({ uid }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    (async () => {
      const { username: returnedUsername } = await getUserInfoByUid(uid);
      setUsername(returnedUsername);
    })();
  }, [uid]);

  return (
    <div className={styles.container}>
      <Avatar username={username} className={styles.avatar} />
      <Link to={`/${username}/`} className={styles.username}>
        {username}
      </Link>
    </div>
  );
}
