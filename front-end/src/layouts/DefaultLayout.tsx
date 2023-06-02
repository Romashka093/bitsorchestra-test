import { Header, Footer } from '../components/index';
import { Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default DefaultLayout;
