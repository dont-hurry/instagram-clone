import { useContext } from "react";
import { UserContext } from "../../context/user";
import HomeIcon from "../icons/Home";
import Avatar from "../UI/Avatar";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import styles from "./LoggedInButtons.module.css";

export default function LoggedInButtons({ isDropdownMenuActive }) {
  // The `Navigation` component ensures that `userInfo` won't be `null` here
  const {
    userInfo: { username },
  } = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Link to="/">
        <HomeIcon filled={!isDropdownMenuActive} />
      </Link>

      <div
        className={styles.avatarWrapper}
        data-active={isDropdownMenuActive} // For CSS
        data-toggle-nav-menu="true" // For event delegation (in feed page)
      >
        <Avatar
          username={username}
          className={styles.avatar}
          data-toggle-nav-menu="true" // For event delegation (in feed page)
        />
      </div>

      {isDropdownMenuActive && <Menu username={username} />}
    </div>
  );
}
