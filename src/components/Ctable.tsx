import { useState, useEffect } from 'react';
import '../styles/CTable.css';
import axios, { AxiosResponse } from 'axios';

export type Client = {
  id: number;
  nome: string;
  percentual: number;
};

export const GetClientStatus = async (
  _id?: number,
  classificacao?: 'EM_ALTA' | 'EM_BAIXA'
): Promise<Client[]> => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'X-TENANT-ID': 'arnia'
    };

    const result: AxiosResponse<Client[]> = await axios.get(
      `https://api.predict.app.br/app/dashboard/clientes`,
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

const ClientsTable = () => {
  const [sortedClients, setSortedClients] = useState<Client[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortClick = () => {
    if (sortOrder === 'asc') {
      setSortedClients([...sortedClients].sort((a, b) => b.percentual - a.percentual));
      setSortOrder('desc');
    } else {
      setSortedClients([...sortedClients].sort((a, b) => a.percentual - b.percentual));
      setSortOrder('asc');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = 123; 
        const classificacao = sortOrder === 'asc' ? 'EM_BAIXA' : 'EM_ALTA';
        const data = await GetClientStatus(id, classificacao);
        setSortedClients(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sortOrder]);


  return (
    <div className="Ccontainer">
      <div className="QP">
        <div className="Cquadradinho"><img src="../src/img/every-user.png" alt="" /></div>
      <caption className="caption">Clientes</caption>
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
      <table className="Ctable">
        <thead>
          <div className="complemento"></div>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Percentual</th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.nome}</td>
              <td>{client.percentual}%</td>
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

export default ClientsTable;
