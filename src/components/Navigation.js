import { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import { getUserInfoByUid, handleSignOut } from "../services/firebase";
import styles from "./Navigation.module.css";
import HomeSvg from "./svgs/Home";

export default function Navigation() {
  const { uid } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState({});
  const [isMenuActive, setIsMenuActive] = useState(false);

  const { username } = userInfo;

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getUserInfoByUid(uid);
      setUserInfo(userInfo);
    };

    getUserInfo();
  }, [uid]);

  const handleAvatarClick = () => {
    setIsMenuActive((prev) => !prev);
  };

  return (
    <nav className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <img src="/images/logo-nav.png" alt="" className={styles.logo} />

        <div className={styles.buttonsContainer}>
          <HomeSvg filled={!isMenuActive} />
          <div className={styles.avatar} onClick={handleAvatarClick}>
            {username && (
              <img
                src={`/images/avatars/${username}.jpeg`}
                alt=""
                onError={(event) => {
                  event.target.src = `/images/avatars/default.jpeg`;
                }}
              />
            )}
          </div>
          <button onClick={() => handleSignOut()}>Sign out</button>
        </div>
      </div>
    </nav>
  );
}
