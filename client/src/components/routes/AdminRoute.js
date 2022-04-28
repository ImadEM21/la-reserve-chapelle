import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { admin } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/404",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
