import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/auth";
import { getUserInfoByUid } from "../services/firebase";
import Navigation from "../components/Navigation";
import styles from "./page-base.module.css";
import Timeline from "../components/Timeline";
import Sidebar from "../components/Sidebar";

export default function Feed() {
  const { uid } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({});
  const { username, following } = userInfo;

  const [isNavMenuActive, setIsNavMenuActive] = useState(false);

  useEffect(() => {
    (async () => {
      const returnedUserInfo = await getUserInfoByUid(uid);
      setUserInfo(returnedUserInfo);
    })();
  }, [uid]);

  // Make the menu close when clicking on empty space
  const handlePageClick = (event) => {
    if (event.target.dataset.toggleNavMenu) {
      setIsNavMenuActive((prevState) => !prevState);
    } else {
      setIsNavMenuActive(false);
    }
  };

  return (
    <div onClick={handlePageClick}>
      <Navigation isNavMenuActive={isNavMenuActive} username={username} />
      <div className={styles.twoColumnsFeedPage}>
        {uid && following && <Timeline uid={uid} following={following} />}
        {uid && username && following && (
          <Sidebar uid={uid} username={username} following={following} />
        )}
      </div>
    </div>
  );
}
