import { useContext } from "react";
import UserContext from "../context/user";

import LoadingPage from "./loading";
import LandingPage from "./landing";
import FeedPage from "./feed";

export default function Home() {
  const { uid } = useContext(UserContext);

  // Waits for the final authentication state
  if (uid === undefined) {
    return <LoadingPage />;
  }
  // User is not logged in
  else if (uid === null) {
    return <LandingPage />;
  }
  // User logged in
  else {
    return <FeedPage />;
  }
}
