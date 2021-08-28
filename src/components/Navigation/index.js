import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";
import HomeSvg from "../svgs/Home";
import Menu from "./Menu";
import Avatar from "../ui/Avatar";

export default function Navigation({ isNavMenuActive, username }) {
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
            <Avatar
              username={username}
              data-toggle-nav-menu="true" // For event delegation (in feed page)
            />
          </div>
          {isNavMenuActive && <Menu username={username} />}
        </div>
      </div>
    </nav>
  );
}
