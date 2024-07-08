import { useState, useEffect } from "react";
import { getProducts } from "../services/services.js";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <div className="h-[87vh]">HomePage</div>;
};

export default HomePage;
