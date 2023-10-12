import Header from "@/shared/header/Header";

const ClientLayout = ({ children }) => {
  return (
    <div>
      <Header />

      {children}
      <div className="max-w-7xl mx-auto">
        <h1 className="bg-red-600">Footer</h1>
      </div>
    </div>
  );
};

export default ClientLayout;
