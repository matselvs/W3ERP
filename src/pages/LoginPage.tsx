import React from 'react';
import LoginForm from '../components/LoginForm';
import "../styles/LoginPage.css";

const LoginPage: React.FC = () => {
  return (
    <div className="login-page">
      <div className="left-section">
        <LoginForm />
      </div>
      <div className="right-section">
        <img src="../src/img/LoginImage.jpeg" alt="Login Image" />
      </div>
    </div>
  );
};

export default LoginPage;
