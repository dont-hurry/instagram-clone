import { useHistory } from "react-router";
import styles from "./Overlay.module.css";
import OverlayListItem from "./OverlayListItem";

const uppercaseFirstLetter = (str) => str[0].toUpperCase() + str.slice(1);

export default function Overlay({ actionField, userInfo, profileUsername }) {
  const uidList = userInfo[actionField];
  const history = useHistory();

  const handleClick = ({ target }) => {
    if (target.dataset.overlay) {
      history.push(`/${profileUsername}/`);
    }
  };

  return (
    <div
      className={styles.outerContainer}
      onClick={handleClick}
      data-overlay="true"
    >
      <div className={styles.innerContainer}>
        <div className={styles.header}>{uppercaseFirstLetter(actionField)}</div>
        <div className={styles.list}>
          {uidList.map((uid) => (
            <OverlayListItem key={uid} uid={uid} />
          ))}
        </div>
      </div>
    </div>
  );
}
