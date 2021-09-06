import styles from "./TimeFromNow.module.css";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function TimeFromNow({ dateCreated }) {
  return (
    <div className={styles.container}>{dayjs(dateCreated).fromNow()}</div>
  );
}
