import styles from "./AuthorContainer.module.css";
import Avatar from "../UI/Avatar";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export default function AuthorContainer({ postUsername }) {
  return (
    <div className={styles.container}>
      <Avatar username={postUsername} className={styles.avatar} />
      <Link to={ROUTES.PROFILE(postUsername)} className={styles.username}>
        {postUsername}
      </Link>
    </div>
  );
}
