import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Sidebar({ username }) {
  const containerRef = useRef();

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

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.userBlock}>
        <Link to={`/${username}/`}>
          <img
            src={`/images/avatars/${username}.jpeg`}
            alt=""
            className={styles.userAvatar}
            onError={(event) => {
              event.target.src = `/images/avatars/default.jpeg`;
            }}
          />
        </Link>
        <Link to={`/${username}/`}>{username}</Link>
      </div>

      <div>
        <div className={styles.suggestionText}>Suggestions For You</div>
        <div></div>
      </div>
    </div>
  );
}
