import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useAuthStateObserver from "./hooks/use-auth-state-observer";
import UserContext from "./context/user";
import RedirectRoute from "./components/helpers/RedirectRoute";

import * as ROUTES from "./constants/routes";
import HomePage from "./pages/home";
import LogInPage from "./pages/log-in";
import SignUpPage from "./pages/sign-up";

export default function App() {
  const uid = useAuthStateObserver();

  return (
    <UserContext.Provider value={{ uid }}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <RedirectRoute path={ROUTES.LOG_IN} condition={uid} to="/">
            <LogInPage />
          </RedirectRoute>
          <RedirectRoute path={ROUTES.SIGN_UP} condition={uid} to="/">
            <SignUpPage />
          </RedirectRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
