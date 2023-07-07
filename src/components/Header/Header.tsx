import React, { useState } from "react";
import "./Header.css";

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle the dark mode class on the body element
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="header">
      <h1 className="desc">Where in the World?</h1>
      <button className="themeSwitch" onClick={handleThemeToggle}>
        <i className="fa fa-moon-o" aria-hidden="false"></i>{" "}
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default Header;
