import axios from "axios";

async function registerUser({ username, email, password, fullname }) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/register",
      {
        username,
        email,
        password,
        fullname,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function loginUser({ email, password }) {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    const AuthToken = response.data.data.AuthToken;
    const userRole = response.data.data.user.role;
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("AuthToken", AuthToken);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function logoutUser() {
  try {
    const token = localStorage.getItem("AuthToken");
    const response = await axios.post(
      "http://localhost:8000/api/v1/user/logout",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("userRole");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getCategories() {
  try {
    const token = localStorage.getItem("AuthToken");
    const response = await axios.get("http://localhost:8000/api/v1/category/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function addCategory({ name }) {
  try {
    const token = localStorage.getItem("AuthToken");
    const response = await axios.post(
      "http://localhost:8000/api/v1/category/",
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function addProduct({ title, price, image, details, category }) {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("details", details);
    formData.append("category", category);
    const token = localStorage.getItem("AuthToken");
    const response = await axios.post(
      "http://localhost:8000/api/v1/product/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function getProducts() {
  try {
    const token = localStorage.getItem("AuthToken");
    const response = await axios.get("http://localhost:8000/api/v1/product/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function getProduct(id) {
  try {
    const token = localStorage.getItem("AuthToken");
    const response = await axios.get(
      `http://localhost:8000/api/v1/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}

async function updateProduct({ id, title, price, details, category }) {
  try {
    const token = localStorage.getItem("AuthToken");
    const response = await axios.put(
      `http://localhost:8000/api/v1/product/${id}`,
      {
        title,
        price,
        details,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function deleteProduct(id) {
  try {
    const token = localStorage.getItem("AuthToken");
    const response = await axios.delete(
      `http://localhost:8000/api/v1/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getCategories,
  addCategory,
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
