import React, { useEffect, useState, ComponentType } from "react";
import { auth } from "../../../firebase";
import { User as FirebaseUser } from "firebase/auth";
import "./AuthHOC.css";
import HeaderLogo from "../../atoms/headerLogo/HeaderLogo";
import AuthGate from "../../molecules/authGate/AuthGate";
import Landingpage from "../../../pages/landingpage/Landingpage";
import LoadingSpinner from "../../atoms/loadingSpinner/LoadingSpinner";
import LoadingContainer from "../../molecules/loadingContainer/LoadingContainer";
import { initializeI18n } from "../../../translation/i18n"; // Import the i18n initializer

interface WithAuthProps {
  user: FirebaseUser;
}

function withAuth<T extends WithAuthProps>(Component: ComponentType<T>) {
  const AuthenticatedComponent: React.FC<Omit<T, "user">> = (props) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isI18nInitialized, setIsI18nInitialized] = useState(false);

    useEffect(() => {
      // Initialize i18next
      const initI18n = async () => {
        await initializeI18n();
        setIsI18nInitialized(true);
      };

      initI18n();

      // Listen for auth state changes
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        setIsLoading(false);
      });

      // Clean up the subscription
      return () => {
        unsubscribe();
      };
    }, []);

    if (isLoading || !isI18nInitialized) {
      return <LoadingContainer />;
    }

    if (!user) {
      return <Landingpage />;
    }

    // If the user is logged in and i18n is initialized, render the passed component with all its props
    return <Component {...(props as T)} user={user} />;
  };

  return AuthenticatedComponent;
}

export default withAuth;