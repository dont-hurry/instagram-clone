import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSuggestedUsers } from "../../services/firebase";
import SuggestedUser from "./SuggestedUser";
import styles from "./Sidebar.module.css";
import Avatar from "../ui/Avatar";

export default function Sidebar({ uid, username, following }) {
  const containerRef = useRef();

  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const updateContainerStyle = () => {
    const containerElement = containerRef.current;

    if (window.innerWidth >= 935) {
      containerElement.style.left = `${(window.innerWidth - 935) / 2 + 645}px`;
    }
  };

  useEffect(() => {
    updateContainerStyle();
    window.addEventListener("resize", updateContainerStyle);

    return () => window.removeEventListener("resize", updateContainerStyle);
  }, []);

  useEffect(() => {
    (async () => {
      if (uid && following) {
        const returnedUsers = await getSuggestedUsers(uid, following);
        setSuggestedUsers(returnedUsers);
      }
    })();
  }, [uid, following]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.userBlock}>
        <Link to={`/${username}/`}>
          <Avatar username={username} className={styles.userAvatar} />
        </Link>
        <Link to={`/${username}/`}>{username}</Link>
      </div>

      <div>
        <div className={styles.suggestionText}>Suggestions For You</div>
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
