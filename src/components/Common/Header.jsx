import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
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
    <div className="w-full h-[8vh] flex justify-around items-center bg-green-500 text-center text-2xl ">
      <Link to="/">CodeMart</Link>
      <div className="">
        <Button className="bg-red-500" onClick={loggedIn ? logout : login}>
          {loggedIn ? "LogOut" : "Log In/Sign Up"}
        </Button>
      </div>
    </div>
  );
};

export default Header;
