import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"; // For navigation and access to URL params

function UpdateProduct() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the product data from the API when the component mounts
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct(data.product); // Populate the form with the existing product data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]); // Fetch product when the `id` parameter changes

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      stock: parseInt(product.stock, 10),
    };

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      // Display success message
      setSuccessMessage("Product updated successfully!");

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h3>Update Product</h3>
      
      {/* Display success message if any */}
      {successMessage && <p>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
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
        <button type="submit">Update Product</button>
      </form>

      {/* Link to navigate back to the products list */}
      <Link to="/products">
        <button>Back to Product List</button>
      </Link>
    </div>
  );
}

export default UpdateProduct;
