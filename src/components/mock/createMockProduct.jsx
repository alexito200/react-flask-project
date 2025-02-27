import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CreateMockProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      stock: parseInt(product.stock, 10),
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      setSuccessMessage("Product created successfully!");

      setProduct({ name: "", description: "", price: "", stock: "" });

      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Create a New Product</h3>
        {successMessage && <p>{successMessage}</p>}

        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          required
        />
        <button type="submit">Create Product</button>
      </form>

      <button onClick={() => navigate("/products")}>Back to Products</button>
    </div>
  );
}

CreateMockProduct.propTypes = {
  onProductAdded: PropTypes.func,
};

export default CreateMockProduct;
