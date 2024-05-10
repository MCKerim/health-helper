import React, { useEffect, useState, ComponentType } from "react";
import { auth } from "../../../firebase";
import { User as FirebaseUser } from "firebase/auth";
import "./AuthHOC.css";
import HeaderLogo from "../../atoms/headerLogo/HeaderLogo";
import AuthGate from "../../molecules/authGate/AuthGate";
import Landingpage from "../../../pages/landingpage/landingpage";
import LoadingSpinner from "../../atoms/loadingSpinner/LoadingSpinner";
import LoadingContainer from "../../molecules/loadingContainer/LoadingContainer";

function withAuth<T>(Component: ComponentType<T>) {
  const AuthenticatedComponent: React.FC<T> = (props) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Listen for auth state changes
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        setIsLoading(false);
      });
      console.log(user);
      // Clean up the subscription
      return () => {
        unsubscribe();
      };
    }, []);

    if (isLoading) {
      return <LoadingContainer />;
    }

    if (!user) {
      return <Landingpage />;
    }

    // If the user is logged in, render the passed component with all its props
    return (
      <>
        <Component {...props} user={user} />
      </>
    );
  };

  return AuthenticatedComponent;
}

export default withAuth;
