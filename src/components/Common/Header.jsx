import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/services/services";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("AuthToken"));
  const login = () => {
    setLoggedIn(true);
    navigate("/auth/login");
  };
  const logout = () => {
    logoutUser();
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <div className="w-full h-[8vh] flex justify-around items-center bg-green-400 text-center text-2xl ">
      CodeMart
      <div className="">
        <Button onClick={loggedIn ? logout : login}>
          {loggedIn ? "Logout" : "Log In/Sign Up"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
