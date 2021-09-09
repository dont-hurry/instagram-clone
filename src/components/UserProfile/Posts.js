import styles from "./Posts.module.css";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import CommentIcon from "./CommentIcon";
import LikeIcon from "./LikeIcon";

function Post({ post: { postId, imagePath, likes, comments } }) {
  return (
    <Link to={ROUTES.POST(postId)}>
      <div className={styles.post}>
        <div className={styles.postOverlay}>
          <div className={styles.iconWrapper}>
            <LikeIcon />
            {likes.length}
          </div>
          <div className={styles.iconWrapper}>
            <CommentIcon />
            {comments.length}
          </div>
        </div>
        <img src={`/images/posts/${imagePath}`} alt="" />
      </div>
    </Link>
  );
}

export default function Posts({ posts }) {
  posts.sort((a, b) => b.dateCreated - a.dateCreated);

  return (
    <div className={styles.container}>
      {posts.length === 0 && (
        <div className={styles.noPostYet}>No Posts Yet</div>
      )}

      {posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </div>
  );
}
