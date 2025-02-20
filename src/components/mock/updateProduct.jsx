import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

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

      setSuccessMessage("Product updated successfully!");

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

      <Link to="/products">
        <button>Back to Product List</button>
      </Link>
    </div>
  );
}

export default UpdateProduct;
