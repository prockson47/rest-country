import React from "react";

const Header: React.FC = () => {
  return (
    <div className="header">
      <h1 className="desc">Where in the World?</h1>
      <button className="themeSwitch">
        <i className="fa fa-moon-o" aria-hidden="true"></i> Dark Mode
      </button>
    </div>
  );
};

export default Header;
