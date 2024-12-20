import { useUser } from "../context/userContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, isProtected }) => {
  const { user } = useUser();

  if (user === null) {
    return element;
  }

  if (isProtected && !user) {
    return <Navigate to="/sign-in" />;
  }

  if (!isProtected && user) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
