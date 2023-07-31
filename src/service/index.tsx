import axios from "axios";
import { ApiPredict } from "../base/baseUrl";

export type LoginProps = {
  login: boolean;
  token?: string | undefined;
  message?: string | undefined;
};
export const Login = async (
  email: string,
  senha: string
): Promise<LoginProps> => {
  try {
    const result = await ApiPredict.post("central/autenticacao/login", {
      email,
      senha,
    });
    if (result.status === 200) {
      console.log("returning true");
      return { login: true, token: result.data.token };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        return { login: false, message: "Usuário ou senha incorreto" };
      }
      if (error.response?.status === 403) {
        return { login: false, message: "Operação não autorizada" };
      }
      if (error.response?.status === 404) {
        return { login: false, message: "Página não encontrada" };
      }
    }
  }
  return { login: false, message: "Erro" };
};
