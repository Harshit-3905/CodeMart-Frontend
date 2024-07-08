import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";

function App() {
  return (
    <div className="w-full h-full bg-sky-300">
      <Header />
      <div className="min-h-[87vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
