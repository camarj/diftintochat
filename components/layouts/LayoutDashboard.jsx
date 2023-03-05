import { SideMenuComponent } from '../SideMenu';

const Layout = ({ children }) => {
  return (
    <>
      <main className="flex flex-row">
        <SideMenuComponent />
        {children}
      </main>
    </>
  );
};

export default Layout;
