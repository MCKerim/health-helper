import React, { useEffect, useState, ComponentType } from "react";
import { auth, getUserCountryCodeFromFirestore } from "../../../firebase";
import { User as FirebaseUser } from "firebase/auth";
import "./AuthHOC.css";
import Landingpage from "../../../pages/landingpage/Landingpage";
import LoadingContainer from "../../molecules/loadingContainer/LoadingContainer";
import i18n from "../../../translation/i18n";

interface WithAuthProps {
  user: FirebaseUser;
}

function withAuth<T extends WithAuthProps>(Component: ComponentType<T>) {
  const AuthenticatedComponent: React.FC<Omit<T, "user">> = (props) => {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Listen for auth state changes
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        setIsLoading(false);
        if (user) {
          // Attempt to get the language code from Firestore
          getUserCountryCodeFromFirestore(user.uid)
            .then((firestoreLanguageCode) => {
              if (firestoreLanguageCode) {
                console.log("Language from Firestore:", firestoreLanguageCode);
                i18n.changeLanguage(firestoreLanguageCode);
                return firestoreLanguageCode;
              }
            })
            .catch((error) => {
              console.error("Error retrieving language from Firestore:", error);
            });
        }
      });

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

    // If the user is logged in and i18n is initialized, render the passed component with all its props
    return <Component {...(props as T)} user={user} />;
  };

  return AuthenticatedComponent;
}

export default withAuth;
