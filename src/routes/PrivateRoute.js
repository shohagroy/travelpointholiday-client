"use client";

import InitialLoading from "@/components/loader/InitialLoading";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PrivateRouteHOC = (WrappedComponent) => {
  const PrivateRoute = (props) => {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const userLoggedIn = isLoggedIn();

    useEffect(() => {
      if (!userLoggedIn) {
        router.push("/login");
      }
      setIsLoading(true);
    }, [router, isLoading, userLoggedIn]);

    if (!isLoading) {
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

    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  };

  return PrivateRoute;
};

export default PrivateRouteHOC;
