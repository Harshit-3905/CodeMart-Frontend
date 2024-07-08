import { useState, useEffect } from "react";
import { getProducts, getCategories } from "../services/services.js";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button.jsx";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState();
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState("");
  useEffect(() => {
    setLoading(true);
    const fetchCategories = async () => {
      const data = await getCategories();
      data.unshift({ name: "All", _id: "1" });
      setAllCategories(data);
    };
    fetchCategories();
    setUserRole(localStorage.getItem("userRole"));
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
      setVisibleProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    if (category === "All") {
      setVisibleProducts(products);
    } else {
      setVisibleProducts(
        products.filter((product) => product.category.name === category)
      );
    }
  }, [category]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center p-5">Products</h1>
      <Select onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {allCategories.map((category) => (
            <SelectItem key={category.name} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {userRole === "admin" && (
        <div className="flex justify-center">
          <Link to="/addproduct">
            <button className="bg-blue-500 text-white p-2 rounded-md">
              Add Product
            </button>
          </Link>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 w-full">
        {visibleProducts.map((product) => (
          <div key={product._id} className="border p-4 bg-red-400 w-[30vw] m-5">
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-contain"
            />
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <h2 className="text-xl font-semibold">{product.details}</h2>
            <p className="text-lg">Price: {product.price}</p>
            <p className="text-lg">Category: {product.category.name}</p>
            {userRole === "admin" && (
              <Link to={`/editproduct/${product._id}`}>
                <Button>Edit</Button>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
