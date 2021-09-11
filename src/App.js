import useAuthStateObserver from "./hooks/use-auth-state-observer";
import { useState, useEffect } from "react";
import { getUserInfoByUid } from "./services/firebase";
import UserContextProvider from "./context/user";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";
import * as ROUTES from "./constants/routes";
import SinglePostPage from "./pages/single-post";
import RedirectRoute from "./components/helpers/RedirectRoute";
import * as AUTH_STATUS from "./constants/auth-status";
import LogInPage from "./pages/log-in";
import SignUpPage from "./pages/sign-up";
import ProfilePage from "./pages/profile";

export default function App() {
  const { status, uid } = useAuthStateObserver();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      if (uid) {
        const returnedUserInfo = await getUserInfoByUid(uid);
        setUserInfo(returnedUserInfo);
      } else {
        // Logging out
        setUserInfo(null);
      }
    })();
  }, [uid]);

  return (
    <UserContextProvider
      status={status}
      uid={uid}
      userInfo={userInfo}
      setUserInfo={setUserInfo}
    >
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path={ROUTES.SINGLE_POST}>
            <SinglePostPage />
          </Route>
          <RedirectRoute
            path={ROUTES.LOG_IN}
            condition={status === AUTH_STATUS.LOGGED_IN}
            to="/"
          >
            <LogInPage />
          </RedirectRoute>
          <RedirectRoute
            path={ROUTES.SIGN_UP}
            condition={status === AUTH_STATUS.LOGGED_IN}
            to="/"
          >
            <SignUpPage />
          </RedirectRoute>
          <Route path={ROUTES.USER_PROFILE}>
            <ProfilePage />
          </Route>
        </Switch>
      </Router>
    </UserContextProvider>
  );
}
