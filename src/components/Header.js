import { useContext } from "react";
import UserContext from "../context/user";
import { handleSignOut } from "../services/firebase";

export default function Header() {
  const { uid } = useContext(UserContext);

  return (
    <>
      <div>uid: {uid}</div>
      <div>
        <button onClick={() => handleSignOut()}>Sign out</button>
      </div>
    </>
  );
}
