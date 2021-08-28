import { Link } from "react-router-dom";
import styles from "./SuggestedUser.module.css";

export default function SuggestedUser({ fullName, username }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          src={`/images/avatar/${username}.jpeg`}
          alt=""
          onError={(event) => {
            event.target.src = `/images/avatars/default.jpeg`;
          }}
        />
        <div className={styles.textContainer}>
          <Link to={`${username}`}>{username}</Link>
          {fullName}
        </div>
      </div>

      <div className={styles.follow}>Follow</div>
    </div>
  );
}
