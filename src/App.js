import useAuthStateObserver from "./hooks/use-auth-state-observer";
import { useState, useEffect } from "react";
import { getUserInfoByUid } from "./services/firebase";
import UserContext from "./context/user";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";
import SinglePostPage from "./pages/single-post";
import RedirectRoute from "./components/helpers/RedirectRoute";
import * as ROUTES from "./constants/routes";
import * as AUTH_STATUS from "./constants/auth-status";
import LogInPage from "./pages/log-in";
import SignUpPage from "./pages/sign-up";

export default function App() {
  const { status, uid } = useAuthStateObserver();

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      if (!uid) {
        setUserInfo(null); // In case of logging out
        return;
      }

      const returnedUserInfo = await getUserInfoByUid(uid);
      setUserInfo(returnedUserInfo);
    })();
  }, [uid]);

  return (
    <UserContext.Provider value={{ status, uid, userInfo }}>
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
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
