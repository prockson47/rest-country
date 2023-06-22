import React from "react";

import CountryCards from "../CountryCards/CountryCards";

const Main: React.FC = () => {
  return (
    <main className="main">
      <div className="country-cards">
        <CountryCards />
      </div>
    </main>
  );
};

export default Main;
