import { useEffect } from "react";
import * as AUTH_STATUS from "../constants/auth-status";
import LoadingIcon from "../components/icons/Loading";
import FeedPage from "./feed";
import LandingPage from "./landing";

export default function Home({ authStatus }) {
  useEffect(() => (document.title = "Instagram"), []);

  if (authStatus === AUTH_STATUS.WAITING) {
    return <LoadingIcon />;
  } else if (authStatus === AUTH_STATUS.LOGGED_IN) {
    return <FeedPage />;
  } else if (authStatus === AUTH_STATUS.NOT_LOGGED_IN) {
    return <LandingPage />;
  }
}
