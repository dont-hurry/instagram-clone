import { useHistory } from "react-router";
import * as ROUTES from "../../constants/routes";
import { likePost, unlikePost } from "../../services/firebase";
import styles from "./Actions.module.css";
import LikeIcon from "../../components/icons/Like";
import UnlikeIcon from "../../components/icons/Unlike";
import CommentIcon from "../icons/Comment";
import SaveIcon from "../icons/Save";

export default function Actions({
  uid,
  likes,
  postId,
  setLikes,
  focusAddCommentInput,
}) {
  const history = useHistory();

  const doesUserLike = likes.includes(uid);

  const handleLike = () => {
    if (!uid) {
      history.push(ROUTES.LOG_IN);
      return;
    }

    likePost(uid, postId);
    setLikes((prevState) => prevState.concat(uid));
  };

  const handleUnlike = () => {
    unlikePost(uid, postId);
    setLikes((prevState) => prevState.filter((value) => value !== uid));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {!doesUserLike && <LikeIcon onClick={handleLike} />}
        {doesUserLike && <UnlikeIcon onClick={handleUnlike} />}
        <CommentIcon onClick={focusAddCommentInput} />
      </div>

      <div className={styles.right}>
        <SaveIcon />
      </div>
    </div>
  );
}
