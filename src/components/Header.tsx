import React, { useState } from "react";
import "../styles/Header.css";

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const email = localStorage.getItem("email");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-profile">
        <img
          className="header-profile-img"
          src="../src/img/user.png"
          alt="Profile Image"
        />
        <div className="header-profile-info">
          <p className="header-profile-name">Matheus</p>
          <p className="header-profile-email">{email}</p>
        </div>
      </div>
      <button className="dropdown-button" onClick={toggleDropdown}>
        <i className="fas fa-chevron-down"></i>
      </button>
      {dropdownOpen && (
        <div
          className={dropdownOpen ? "dropdown-menu open" : "dropdown-menu"}
          onClick={closeDropdown}
        >
          <ul>
            <li>
              <i className="fas fa-cogs"></i> Configurações
            </li>
            <li>
              <i className="fas fa-arrow-right"></i> Sair
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
