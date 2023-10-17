import NoAuthNavbar from "@/components/navbars/no_auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NoAuthNavbar />
      {children}
    </>
  );
};
export default Layout;
