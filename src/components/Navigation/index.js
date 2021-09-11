import { useContext } from "react";
import { UserContext } from "../../context/user";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import LoggedInButtons from "./LoggedInButtons";
import AnonymousButtons from "./AnonymousButtons";

export default function Navigation({ isDropdownMenuActive }) {
  const userContext = useContext(UserContext);

  const hasUserLoggedIn = userContext.userInfo !== null;

  return (
    <nav className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <Link to="/">
          <img src="/images/logo-nav.png" alt="" className={styles.logo} />
        </Link>

        {hasUserLoggedIn && (
          <LoggedInButtons isDropdownMenuActive={isDropdownMenuActive} />
        )}

        {!hasUserLoggedIn && <AnonymousButtons />}
      </div>
    </nav>
  );
}
