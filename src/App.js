import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useAuthStateObserver from "./hooks/use-auth-state-observer";
import UserContext from "./context/user";

import * as ROUTES from "./constants/routes";
import LandingPage from "./pages/landing";
import LogInPage from "./pages/log-in";
import SignUpPage from "./pages/sign-up";

export default function App() {
  const uid = useAuthStateObserver();

  return (
    <UserContext.Provider value={{ uid }}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <LandingPage />
          </Route>
          <Route path={ROUTES.LOG_IN}>
            <LogInPage />
          </Route>
          <Route path={ROUTES.SIGN_UP}>
            <SignUpPage />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
