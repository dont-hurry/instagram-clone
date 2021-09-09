import styles from "./index.module.css";
import { Link } from "react-router-dom";
import HomeIcon from "../icons/Home";
import Avatar from "../UI/Avatar";
import Menu from "./Menu";

export default function Navigation({ isNavMenuActive, username }) {
  return (
    <nav className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <Link to="/">
          <img src="/images/logo-nav.png" alt="" className={styles.logo} />
        </Link>

        {username && (
          <div className={styles.loggedInButtonsContainer}>
            <Link to="/">
              <HomeIcon filled={!isNavMenuActive} />
            </Link>
            <div
              className={styles.avatarWrapper}
              data-active={isNavMenuActive} // For CSS
              data-toggle-nav-menu="true" // For event delegation (in feed page)
            >
              <Avatar
                username={username}
                className={styles.avatar}
                data-toggle-nav-menu="true" // For event delegation (in feed page)
              />
            </div>
            {isNavMenuActive && <Menu username={username} />}
          </div>
        )}

        {!username && (
          <div className={styles.anonymousButtonsContainer}>
            <Link to="/" className={styles.loginButton}>
              登入
            </Link>
            <Link to="/" className={styles.signUpButton}>
              註冊
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
