import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "@/services/services";
import AddProductPage from "./AddProductPage";

const EditProductPage = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchProduct = async () => {
      const data = await getProduct(id);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <AddProductPage product={product} />;
};

export default EditProductPage;
