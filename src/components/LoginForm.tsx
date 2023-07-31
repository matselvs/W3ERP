import React, { useState } from "react";
import showPasswordImage from "../img/pngwing.com.png";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hook";
import { LoginProps } from "../service";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useLogin();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  const handleSubmit = (
    login: (email: string, senha: string) => Promise<LoginProps>,
    onSuccess: () => void
  ) => {
    return async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const email = event.currentTarget.elements.namedItem(
        "email"
      ) as HTMLInputElement;
      const senha = event.currentTarget.elements.namedItem(
        "password"
      ) as HTMLInputElement;

      if (email && senha) {
        const response = await login(email.value, senha.value);
        const success = response.login;
        if (success) {
          onSuccess();
        }
      }
    };
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    
    if (inputName === "email") {
      setEmail(inputValue);
    } else if (inputName === "password") {
      setPassword(inputValue);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(login, handleLogin)}>
      <p>Seja bem-vindo!</p>
      <h2>Realize seu Login</h2>
      <div className="form-group">
        <div className="label-container">
          <label
            htmlFor="email"
            className={`label-top-left ${email ? "filled" : ""}`}
          >
            E-mail
          </label>
        </div>
        <input
          type="email"
          name="email"
          className={email ? "filled" : ""}
          value={email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group password-input">
        <div className="label-container">
          <label
            htmlFor="password"
            className={`label-top-left ${password ? "filled" : ""}`}
          >
            Senha
          </label>
        </div>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className={password ? "filled" : ""}
            value={password}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="show-password-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img
                src={showPasswordImage}
                alt="Hide Password"
                className="show-password-icon"
              />
            ) : (
              <img
                src={showPasswordImage}
                alt="Show Password"
                className="show-password-icon"
              />
            )}
          </button>
        </div>
      </div>
      <div className="form-group remember-me-forgot-password">
        <div>
          <input
            type="checkbox"
            id="remember-me"
            name="rememberMe"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.target.checked)}
          />
          <label htmlFor="remember-me">Lembrar-me</label>
        </div>
        <div>
          <a href="<URL>">Esqueci minha senha</a>
        </div>
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
