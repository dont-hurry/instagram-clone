import { Route, Redirect } from "react-router-dom";

// If `condition` is `true`, then redirects to `to`, otherwise returns the
// fallback component specified in `children`.
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
