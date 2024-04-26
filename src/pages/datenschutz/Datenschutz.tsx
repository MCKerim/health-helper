import React from "react";
import withAuth from "../../components/HOCs/AuthHOC/AuthHOC";
import DatenschutzWindow from "../../components/molecules/datenschutzWindow/DatenschutzWindow";
import Header from "../../components/organisms/header/Header";

export const Datenschutz: React.FC = () => {
  return (
    <div className={"App"}>
      <div>
        <Header />
      </div>
      <div className={"MainContentContainer"}>
        <DatenschutzWindow />
      </div>
    </div>
  );
};

export default withAuth(Datenschutz);
