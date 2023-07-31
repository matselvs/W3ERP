import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/DashboardCard.css';

interface CardProps {
  title: string;
}

const fetchData = async (setTitlePercentage: (percentage: number) => void, title: string) => {
  try {
    // Simulating API response with mocked data
    const data = {
      itemsHighPercentage: Math.floor(Math.random() * 100),
      itemsLowPercentage: Math.floor(Math.random() * 100),
      customersHighPercentage: Math.floor(Math.random() * 100),
      customersLowPercentage: Math.floor(Math.random() * 100),
    };

    switch (title) {
      case 'Produtos em Alta':
        setTitlePercentage(data.itemsHighPercentage);
        break;
      case 'Produtos em Baixa':
        setTitlePercentage(data.itemsLowPercentage);
        break;
      case 'Clientes em Alta':
        setTitlePercentage(data.customersHighPercentage);
        break;
      case 'Clientes em Baixa':
        setTitlePercentage(data.customersLowPercentage);
        break;
      default:
        setTitlePercentage(0);
    }
  } catch (error) {
    console.log(error);
  }
};

const DashboardCard: React.FC<CardProps> = ({ title }) => {
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    fetchData(setPercentage, title);
  }, [title]);

  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <div className="chart-container">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={{
            root: { width: '50px' },
            path: { stroke: '#00C2FF' },
            trail: { stroke: 'transparent' },
            text: { fill: '#fff', fontSize: '18px', fontWeight: 'bold' },
          }}
        />
      </div>
    </div>
  );
};

export default DashboardCard;
