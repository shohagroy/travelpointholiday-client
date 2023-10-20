"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isLoggedIn } from "@/services/auth.service";
import InitialLoading from "@/components/loader/InitialLoading";

const PrivateRouteHOC = (WrappedComponent) => {
  const PrivateRoute = (props) => {
    const [isLoading, setIsLoading] = useState(true); // Initialize as true

    const router = useRouter();
    const userLoggedIn = isLoggedIn();

    useEffect(() => {
      if (!userLoggedIn) {
        router.push("/login");
      } else {
        setIsLoading(false); // Set loading to false when user is logged in
      }
    }, [router, userLoggedIn]);

    if (isLoading) {
      return (
        <div
          style={{
            height: "100vh",
            width: "100%",
          }}
        >
          <InitialLoading />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return PrivateRoute;
};

export default PrivateRouteHOC;
