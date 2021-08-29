import styles from "./Actions.module.css";
import LikeIcon from "../../components/icons/Like";
import UnlikeIcon from "../../components/icons/Unlike";
import CommentIcon from "../icons/Comment";
import SaveIcon from "../icons/Save";

export default function Actions({ uid, likes }) {
  const doesUserLike = likes.includes(uid);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {!doesUserLike && <LikeIcon />}
        {doesUserLike && <UnlikeIcon />}
        <CommentIcon />
      </div>

      <div className={styles.right}>
        <SaveIcon />
      </div>
    </div>
  );
}
