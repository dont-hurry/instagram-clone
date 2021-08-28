import { useContext } from "react";
import UserContext from "../context/user";

export default function Header() {
  const { uid } = useContext(UserContext);

  return <div>uid: {uid}</div>;
}
