import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { addProduct, getCategories, updateProduct } from "@/services/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "react-router-dom";

const AddProductPage = (product) => {
  const [title, setTitle] = useState(product.product?.title || "");
  const [price, setPrice] = useState(product.product?.price || "");
  const [image, setImage] = useState(product.product?.image || "");
  const [details, setDetails] = useState(product.product?.details || "");
  const [category, setCategory] = useState(product.product?.category || "");
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const SubmitHandler = async () => {
    setLoading(true);
    await addProduct({ title, price, image, details, category });
    setLoading(false);
    setTitle("");
    setPrice("");
    setImage("");
    setDetails("");
    setCategory("");
    navigate("/");
  };
  const EditHandler = async () => {
    setLoading(true);
    console.log({
      id: product.product._id,
      title,
      price,
      image,
      details,
      category,
    });
    await updateProduct({
      id: product.product._id,
      title,
      price,
      image,
      details,
      category,
    });
    setLoading(false);
    navigate("/");
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setAllCategories(data);
    };
    fetchCategories();
  }, []);
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-10 ">
      <h1 className="text-3xl font-bold text-center p-5">
        {product.product ? "Edit Product" : "Add Product"}
      </h1>
      <div className=" flex flex-col gap-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="details">Details</Label>
          <Input
            type="text"
            id="details"
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <Select onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {allCategories.map((category) => (
              <SelectItem key={category.name} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="w-full flex items-center justify-center pt-5 gap-5">
          {product.product ? (
            <Button
              type="submit"
              onClick={EditHandler}
              disabled={loading}
              className="bg-green-700"
            >
              {loading ? "Loading" : "Edit"}
            </Button>
          ) : (
            <Button
              type="submit"
              onClick={SubmitHandler}
              disabled={loading}
              className="bg-green-700"
            >
              {loading ? "Loading" : "Add"}
            </Button>
          )}
          <Link to="/" className="flex items-center justify-center">
            <Button>Go Back</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
