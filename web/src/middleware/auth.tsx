import { jwtDecode } from "jwt-decode";

import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import useJWT from "@/hooks/useJWT";

interface JwtPayload {
  role: string;
}

const withClientAuth = <P extends object>(Component: React.ComponentType<P>, requiredRole: string): React.FC<P> => {
  return (props: P) => {
    const navigate = useNavigate();
    const { jwt } = useJWT();
    const [isAuthorized, setIsAuthorized] = useState(true);

    useEffect(() => {
      let decoded: JwtPayload;
      try {
        decoded = jwtDecode<JwtPayload>(jwt);
      } catch (error) {
        navigate({ to: "/signin" });
        return;
      }

      if (!jwt || decoded.role !== requiredRole) {
        navigate({ to: "/signin" });
        setIsAuthorized(false);
      }
    }, [jwt, navigate]);

    if (!isAuthorized) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default withClientAuth;
