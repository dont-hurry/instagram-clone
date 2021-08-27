import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as ROUTES from "./constants/routes";
import LandingPage from "./pages/landing";
import LogInPage from "./pages/log-in";
import SignUpPage from "./pages/sign-up";

export default function App() {
  return (
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
  );
}
