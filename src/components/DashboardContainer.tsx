import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../styles/DashboardContainer.css";
import { Dashdata } from "../service/dashData";

const DashboardContainer: React.FC = () => {

  
    useState<number>(0);
  const [clientesEmAltaPercentage ] =
    useState<number>(0);
  const [clientesEmBaixaPercentage] =
    useState<number>(0);

  

  useEffect(() => {
    async function dados() {
      try {
        const dataInicial = "";
        const dataFinal = "";
        const result = await Dashdata(dataInicial, dataFinal);
        console.log(result);
        (result);
      } catch (error) {
        console.error(error)
      }
    }
    dados();
  }, []);

 

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Dashboard</h2>
      <div className="dropdown">
        <select className="botãotempo">
          <option value="Este Mês">Mostrar: Este Mês</option>
          <option value="Este Ano">Mostrar: Este Ano</option>
        </select>
      </div>
      <div className="card-wrapper">
        <div className="dashboard-card">
          <p className="cardtitulo">
            Total <span className="bold-text">Produtos</span> em Alta
          </p>
          <div className="chart-container">
            <CircularProgressbar
              value={34}
              text={`${34}%`}
              styles={{
                root: { width: "50px" },
                path: { stroke: "#796CE0" },
                trail: { stroke: "transparent" },
                text: { fill: "#fff", fontSize: "18px", fontWeight: "bold" },
              }}
            />
            <h2 className="numerocard">120</h2>
            <p className="percentage-text1">{`${28}%`}</p>
          </div>
        </div>
        <div className="dashboard-card">
          <p className="cardtitulo">
            Total <span className="bold-text">Produtos</span> em Baixa
          </p>
          <div className="chart-container">
            <CircularProgressbar
              value={48}
              text={`${48}%`}
              styles={{
                root: { width: "50px" },
                path: { stroke: "#796CE0" },
                trail: { stroke: "transparent" },
                text: { fill: "#fff", fontSize: "18px", fontWeight: "bold" },
              }}
            />
            <h2 className="numerocard2">120</h2>
            <p className="percentage-text2">{`${39}%`}</p>
          </div>
        </div>
        <div className="dashboard-card">
          <p className="cardtitulo">
            Total <span className="bold-text">Clientes</span> em Alta
          </p>
          <div className="chart-container">
            <CircularProgressbar
              value={clientesEmAltaPercentage}
              text={`${clientesEmAltaPercentage}%`}
              styles={{
                root: { width: "50px" },
                path: { stroke: "#796CE0" },
                trail: { stroke: "transparent" },
                text: { fill: "#fff", fontSize: "18px", fontWeight: "bold" },
              }}
            />
            <h2 className="numerocard3">120</h2>
            <p className="percentage-text3">{`${clientesEmAltaPercentage}%`}</p>
          </div>
        </div>
        <div className="dashboard-card">
          <p className="cardtitulo">
            Total <span className="bold-text">Clientes</span> em Baixa
          </p>
          <div className="chart-container">
            <CircularProgressbar
              value={clientesEmBaixaPercentage}
              text={`${clientesEmBaixaPercentage}%`}
              styles={{
                root: { width: "50px" },
                path: { stroke: "#796CE0" },
                trail: { stroke: "transparent" },
                text: { fill: "#fff", fontSize: "18px", fontWeight: "bold" },
              }}
            />
            <h2 className="numerocard4">120</h2>
            <p className="percentage-text4">{`${clientesEmBaixaPercentage}%`}</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DashboardContainer;
