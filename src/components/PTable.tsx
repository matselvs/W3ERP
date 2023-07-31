import { useState, useEffect } from 'react';
import '../styles/PTable.css';
import axios, { AxiosResponse } from 'axios';

export type Product = {
  id: number;
  nome: string;
  percentual: number;
};

export const GetProductStatus = async (
  id: number,
  classificacao: 'EM_ALTA' | 'EM_BAIXA'
): Promise<Product[]> => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'X-TENANT-ID': 'arnia'
    };

    const result: AxiosResponse<Product[]> = await axios.get(
      `https://api.predict.app.br/app/dashboard/produtos`,
      {
        headers,
        params: { classificacao }
      }
    );

    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Operação não autorizada');
      }
      if (error.response?.status === 403) {
        throw new Error('Usuário não tem permissão de acesso');
      }
      if (error.response?.status === 404) {
        throw new Error('Página não encontrada');
      }
    }
  }

  throw new Error('Página em manutenção');
};

const ProductsTable = () => {
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortClick = () => {
    if (sortOrder === 'asc') {
      setSortedProducts([...sortedProducts].sort((a, b) => b.percentual - a.percentual));
      setSortOrder('desc');
    } else {
      setSortedProducts([...sortedProducts].sort((a, b) => a.percentual - b.percentual));
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = 123; 
        const classificacao = sortOrder === 'asc' ? 'EM_BAIXA' : 'EM_ALTA';
        const data = await GetProductStatus(id, classificacao);
        setSortedProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sortOrder]);

  return (
    <div className="Pcontainer">
      <div className="QP">
        <div className="quadradinho">
          <img src="../src/img/facial-cleanser.png" alt="" />
        </div>
        <caption className="caption">Produtos</caption>
      </div>
      <div className="buttons">
        <button
          className={`button ${sortOrder === 'desc' ? 'up active' : 'up'}`}
          onClick={handleSortClick}
        >
          Em alta
        </button>
        <button
          className={`button ${sortOrder === 'asc' ? 'down active' : 'down'}`}
          onClick={handleSortClick}
        >
          Em baixa
        </button>
      </div>
      <table className="Ttable">
        <thead>
        <div className="complemento"></div>
          <tr>
            <th>ID</th>
            <th>Produto</th>
            <th>Percentual</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nome}</td>
              <td>{product.percentual}%</td>
              <td className="arrow-cell">
                <i className="fas fa-chevron-right"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
