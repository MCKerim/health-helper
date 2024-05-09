import React, { useState } from "react";
import withAuth from "../../components/HOCs/AuthHOC/AuthHOC";
import Header from "../../components/organisms/header/Header";
import AccountDeletionModal from "../../components/molecules/accountDeletionModal/AccountDeletionModal";
import { signOutUser } from "../../firebase";

const Account: React.FC = () => {
  // State to control visibility of the confirmation modal
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={"App"}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "15px",
            paddingBottom: "20px",
            borderRadius: "10px",
            width: "250px",
          }}
        >
          <h1
            className={"fade-in-fwd"}
            style={{
              margin: "0px",
              marginBottom: "20px",
            }}
          >
            Account
          </h1>
          <button className={"ActionButton fade-in-fwd"} onClick={signOutUser}>
            Abmelden
          </button>
          <button className={"ActionButton fade-in-fwd"} onClick={toggleModal}>
            Account löschen
          </button>
          <AccountDeletionModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Account);
