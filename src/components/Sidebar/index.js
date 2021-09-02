import { useRef, useState, useEffect } from "react";
import { getSuggestedUsers } from "../../services/firebase";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Avatar from "../ui/Avatar";
import SuggestedUser from "./SuggestedUser";

export default function Sidebar({ uid, username, following }) {
  const containerRef = useRef();

  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const updateContainerPosition = () => {
    const containerElement = containerRef.current;

    if (window.innerWidth >= 935) {
      containerElement.style.left = `${(window.innerWidth - 935) / 2 + 645}px`;
    }
  };

  useEffect(() => {
    updateContainerPosition();
    window.addEventListener("resize", updateContainerPosition);

    return () => window.removeEventListener("resize", updateContainerPosition);
  }, []);

  useEffect(() => {
    (async () => {
      const returnedSuggestedUsers = await getSuggestedUsers(uid, following);
      setSuggestedUsers(returnedSuggestedUsers);
    })();
  }, [uid, following]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.userBlock}>
        <Link to={ROUTES.PROFILE(username)}>
          <Avatar username={username} className={styles.userAvatar} />
        </Link>
        <Link to={ROUTES.PROFILE(username)}>{username}</Link>
      </div>

      <div>
        <div className={styles.suggestionTitle}>Suggestions For You</div>
        <div>
          {suggestedUsers.map(({ fullName, username }) => (
            <SuggestedUser
              key={username}
              fullName={fullName}
              username={username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
