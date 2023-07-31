import axios from "axios";

export type DashboardData = {
 percentualTotalClientesAlta: number,
 percentualTotalClientesBaixa: number,
 percentualTotalProdutosAlta: number,
 percentualTotalProdutosBaixa: number,
 percentualVariacaoClientesAlta: number,
 percentualVariacaoClientesBaixa: number,
 percentualVariacaoProdutosAlta: number,
 percentualVariacaoProdutosBaixa: number,
 quantidadeClientesAlta: number,
 quantidadeClientesBaixa: number,
 quantidadeProdutosAlta: number,
 quantidadeProdutosBaixa: number
}

export const Dashdata = async (

  dataInicial:string,
  dataFinal:string

): Promise<DashboardData> => {
  try {
    const token = localStorage.getItem("token")
    const headers = {
      Authorization:`Bearer ${token}`,
      'X-TENANT-ID':'arnia'
    }
    const result = await axios.get("/app/dashboard/resumo", {
      headers,
      params:{
      dataInicial,
      dataFinal
    }
    });
    if (result.status === 200) {
      console.log("funciona logo");
      return result.data
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error("Pagina Perdida")
      }
      if (error.response?.status === 403) {
        throw new Error("Pagina em Lost")
      }
      if (error.response?.status === 404) {
        throw new Error("Servidor não encontrado")
      }
    }
  }
  throw new Error("Pagina em Manutenção")
};