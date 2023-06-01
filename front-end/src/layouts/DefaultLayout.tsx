import { Outlet } from 'react-router-dom';

const DefaultLayout: React.FC = () => {
  return (
    <>
      {/* <header>
        <nav></nav>
      </header> */}
      <main>
        <Outlet />
      </main>
      {/* <footer></footer> */}
    </>
  );
};
export default DefaultLayout;
