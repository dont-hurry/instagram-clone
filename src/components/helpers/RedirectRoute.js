import { Route, Redirect } from "react-router-dom";

// If `condition` is `true`, then redirect.
// Otherwise return the fallback component.
export default function RedirectRoute({ path, condition, to, children }) {
  return (
    <Route
      path={path}
      render={() => {
        if (condition) {
          return <Redirect to={to} />;
        } else {
          return children;
        }
      }}
    />
  );
}
