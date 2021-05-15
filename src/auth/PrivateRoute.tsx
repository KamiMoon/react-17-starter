import { useAppSelector } from "../redux/hooks";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute(props: any) {
  const { component: Component, ...rest } = props;
  const auth = useAppSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated && auth.hasRequiredPrivileges) {
          return <Component {...props} />;
        } else if (auth.isAuthenticated && !auth.hasRequiredPrivileges) {
          return (
            <Redirect
              to={{
                pathname: "/not-authorized",
                state: { from: props.location },
              }}
            />
          );
        }

        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}
