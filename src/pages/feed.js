import { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import { getUserInfoByUid } from "../services/firebase";
import Navigation from "../components/Navigation";
import Timeline from "../components/Timeline";
import Sidebar from "../components/Sidebar";
import styles from "./feed.module.css";

export default function Feed() {
  const { uid } = useContext(UserContext);

  const [isNavMenuActive, setIsNavMenuActive] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const { username, following } = userInfo;

  useEffect(() => {
    (async () => {
      const userInfo = await getUserInfoByUid(uid);
      setUserInfo(userInfo);
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
      <div className={styles.twoColumns}>
        <Timeline uid={uid} following={following} />
        {uid && username && following && (
          <Sidebar uid={uid} username={username} following={following} />
        )}
      </div>
    </div>
  );
}
