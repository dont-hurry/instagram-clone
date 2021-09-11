import { useState, useEffect } from "react";
import { getSuggestedUsers } from "../../services/firebase";
import styles from "./SuggestedUsers.module.css";
import SuggestedUsersItem from "./SuggestedUsersItem";

export default function SuggestedUsers({ uid, following }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const returnedSuggestedUsers = await getSuggestedUsers(uid, following);
      setUsers(returnedSuggestedUsers);
    })();
  }, [uid, following]);

  return (
    <div>
      <div className={styles.title}>Suggestions For You</div>
      <div>
        {users.map(({ fullName, username, uid: suggestedUserUid }) => (
          <SuggestedUsersItem
            key={username}
            fullName={fullName}
            username={username}
            suggestedUserUid={suggestedUserUid}
            currentUserUid={uid}
          />
        ))}
      </div>
    </div>
  );
}
