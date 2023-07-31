// NavBar.tsx

import React from 'react';
import '../styles/NavBar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
        <div className="titulo-container"><img className="navbar-tittle" src="../src/img/w3.jpg" alt="Navbar Image"  /></div>
       
        <div className="navbar-buttons">
        <button className="navbar-button">
          <i className="fas fa-chart-pie" ></i> Dashboard
        </button>
        <button className="navbar-button">
          <i className="fas fa-chart-line" ></i> Predições
        </button>
        <button className="navbar-button">
          <i className="fas fa-tag" ></i> Produtos
        </button>
      </div>
      <div className="navbar-container">
        <img className="navbar-img" src="../src/img/Saly-31.png" alt="Navbar Image" />
        <p className="navbar-text"> Precisa de <span className="bold-text">ajuda</span> ou <span className="bold-text">suporte</span> em algo?</p>
        <button className="navbarC-button">Fale Conosco</button>
      </div>
    </nav>
  );
}

export default NavBar;
