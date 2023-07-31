import NavBar from '../components/NavBar';
import Header from '../components/Header';
import DashboardContainer from '../components/DashboardContainer';
import ProductsTable from '../components/PTable';
import ClientsTable from '../components/Ctable';

const Dashboard: React.FC = () => {

  return (
    <div>
        <div>
          <NavBar />
          <Header />
          <DashboardContainer />
          <ProductsTable/>
          <ClientsTable/>
        </div>
      
    </div>
  );
};

export default Dashboard;