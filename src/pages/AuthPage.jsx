import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthPage;
