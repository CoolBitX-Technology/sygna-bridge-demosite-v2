import React from "react";
import logo from "../logo.svg";
import "../styles/header.scss";

function Header() {
  return (
    <div id="header">
      <div className="container">
        <div className="logo">
          <a href="index.html">
            <img src={logo} alt="SYGNA Bridge" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
