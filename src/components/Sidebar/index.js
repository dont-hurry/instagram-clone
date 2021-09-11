import { useContext, useRef, useEffect } from "react";
import { UserContext } from "../../context/user";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Avatar from "../UI/Avatar";
import SuggestedUsers from "./SuggestedUsers";

export default function Sidebar() {
  const userContext = useContext(UserContext);

  const containerRef = useRef();

  // Make the position of container fixed
  const updateContainerPosition = () => {
    const containerElement = containerRef.current;

    if (containerElement && window.innerWidth >= 935) {
      containerElement.style.left = `${(window.innerWidth - 935) / 2 + 645}px`;
    }
  };

  useEffect(
    () => {
      updateContainerPosition();
      window.addEventListener("resize", updateContainerPosition);

      return () =>
        window.removeEventListener("resize", updateContainerPosition);
    },
    // `containerRef` updates when `userContext.userInfo` updates, so we add it
    // as a dependency here.
    [userContext.userInfo]
  );

  if (!userContext.userInfo) return null;

  const { uid } = userContext;
  const { username, following } = userContext.userInfo;

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.userBlock}>
        <Link to={ROUTES.PROFILE(username)}>
          <Avatar username={username} className={styles.userAvatar} />
        </Link>
        <Link to={ROUTES.PROFILE(username)}>{username}</Link>
      </div>
      <SuggestedUsers uid={uid} following={following} />
    </div>
  );
}
