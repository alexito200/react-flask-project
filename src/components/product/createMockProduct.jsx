import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

function CreateMockProduct({ onProductAdded }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name: product.name,
      description: product.description,
      price: parseFloat(product.price), // Convert price to number
      stock: parseInt(product.stock, 10), // Convert stock to number
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

      const createdProduct = await response.json();
      onProductAdded(createdProduct.product); // Update parent state with new product

      // Reset form fields after successful creation
      setProduct({ name: "", description: "", price: "", stock: "" });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Product</h3>
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
  );
}

// ✅ Add PropTypes validation
CreateMockProduct.propTypes = {
  onProductAdded: PropTypes.func.isRequired, // Ensure it's a required function
};

export default CreateMockProduct;
