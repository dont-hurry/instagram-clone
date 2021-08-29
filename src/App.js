import useAuthStateObserver from "./hooks/use-auth-state-observer";
import AuthContext from "./context/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home";
import RedirectRoute from "./components/helpers/RedirectRoute";
import * as ROUTES from "./constants/routes";
import * as AUTH_STATUS from "./constants/auth-status";
import LogInPage from "./pages/log-in";
import SignUpPage from "./pages/sign-up";

export default function App() {
  const { status, uid } = useAuthStateObserver();

  return (
    <AuthContext.Provider value={{ status, uid }}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomePage authStatus={status} />
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
    </AuthContext.Provider>
  );
}
