import LikeSvg from "../../components/icons/Like";
import UnlikeSvg from "../../components/icons/Unlike";
import CommentSvg from "../icons/Comment";
import SaveSvg from "../icons/Save";
import styles from "./Actions.module.css";

export default function Actions({ uid, likes }) {
  const userLikes = likes.includes(uid);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {!userLikes && <LikeSvg className={styles.svgLike} />}
        {userLikes && <UnlikeSvg className={styles.svgUnlike} />}
        <CommentSvg className={styles.svgComment} />
      </div>
      <div className={styles.right}>
        <SaveSvg className={styles.svgSave} />
      </div>
    </div>
  );
}
