import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/user";
import { getUserInfoByUid } from "../../services/firebase";
import styles from "./base.module.css";
import HomeSvg from "../svgs/Home";
import Menu from "./Menu";

export default function Navigation({ isNavMenuActive }) {
  const { uid } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState({});
  const { username } = userInfo;

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getUserInfoByUid(uid);
      setUserInfo(userInfo);
    };

    getUserInfo();
  }, [uid]);

  return (
    <nav className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <Link to="/">
          <img src="/images/logo-nav.png" alt="" className={styles.logo} />
        </Link>

        <div className={styles.buttonsContainer}>
          <Link to="/">
            <HomeSvg filled={!isNavMenuActive} />
          </Link>
          <div
            className={styles.avatar}
            data-active={isNavMenuActive} // For CSS
            data-toggle-nav-menu="true" // For event delegation (in feed page)
          >
            <img
              src={`/images/avatars/${username}.jpeg`}
              alt=""
              data-toggle-nav-menu="true" // For event delegation (in feed page)
              onError={(event) => {
                event.target.src = `/images/avatars/default.jpeg`;
              }}
            />
          </div>
          {isNavMenuActive && <Menu />}
        </div>
      </div>
    </nav>
  );
}
