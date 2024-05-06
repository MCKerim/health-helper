import React, { useState } from "react";
import withAuth from "../../components/HOCs/AuthHOC/AuthHOC";
import Header from "../../components/organisms/header/Header";
import AccountDeletionModal from "../../components/molecules/accountDeletionModal/AccountDeletionModal";

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
      <div className={"MainContentContainer"}>
        <h1 className={"fade-in-fwd"}>Account</h1>
        <button className={"ActionButton fade-in-fwd"} onClick={toggleModal}>
          Delete Account
        </button>
        <AccountDeletionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};

export default withAuth(Account);
