import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";

function App() {
  return (
    <div className="w-full h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
