import React from "react";
import "./Main.css";

import CountryCards from "../CountryCards/CountryCards";

const Main: React.FC = () => {
  return (
    <main className="main">
      <div className="country-cards">
        <CountryCards limit={8} />
      </div>
    </main>
  );
};

export default Main;
