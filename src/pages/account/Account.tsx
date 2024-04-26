import React from "react";
import withAuth from "../../components/HOCs/AuthHOC/AuthHOC";
import Header from "../../components/organisms/header/Header";

export const Account: React.FC = () => {
  return (
    <div className={"App"}>
      <div>
        <Header />
      </div>
      <div className={"MainContentContainer"}>
        <h1>Account</h1>
      </div>
    </div>
  );
};

export default withAuth(Account);
