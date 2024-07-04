import React from "react";
import withAuth from "../../components/HOCs/AuthHOC/AuthHOC";
import DatenschutzWindow from "../../components/molecules/datenschutzWindow/DatenschutzWindow";
import Header from "../../components/organisms/header/Header";
import { auth } from "../../firebase";

const Datenschutz: React.FC = () => {
  return (
    <div className={"App"}>
      {auth.currentUser ? (
        <div>
          <Header />
        </div>
      ) : null}
      <div
        style={{
          marginTop: "100px",
        }}
      >
        <DatenschutzWindow />
      </div>
    </div>
  );
};

export default auth.currentUser ? withAuth(Datenschutz) : Datenschutz;
