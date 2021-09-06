import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/auth";
import { getUserInfoByUid } from "../services/firebase";
import NavigationLayout from "../components/layout/navigation";
import styles from "./page-base.module.css";
import Timeline from "../components/Timeline";
import Sidebar from "../components/Sidebar";

export default function Feed() {
  const { uid } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({});
  const { username, following } = userInfo;

  useEffect(() => {
    (async () => {
      const returnedUserInfo = await getUserInfoByUid(uid);
      setUserInfo(returnedUserInfo);
    })();
  }, [uid]);

  return (
    <NavigationLayout username={username}>
      <div className={styles.twoColumnsFeedPage}>
        {uid && following && <Timeline uid={uid} following={following} />}
        {uid && username && following && (
          <Sidebar uid={uid} username={username} following={following} />
        )}
      </div>
    </NavigationLayout>
  );
}
